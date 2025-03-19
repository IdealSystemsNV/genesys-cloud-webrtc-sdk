import { Constants } from 'stanza';
import { IPendingSession, IAcceptSessionRequest, ISessionMuteRequest, IExtendedMediaSession, IConversationParticipant, IStartVideoSessionParams, VideoMediaSession, IMemberStatusMessage } from '../types/interfaces';
import BaseSessionHandler from './base-session-handler';
import { ConversationUpdate } from '../conversations/conversation-update';
import { JsonRpcMessage } from 'genesys-cloud-streaming-client';
/**
 * speakers is an array of audio track ids sending audio
 */
export interface IMediaChangeEvent {
    eventBody: {
        id: string;
        participants: IMediaChangeEventParticipant[];
        speakers: string[];
    };
    metadata: {
        CorrelationId: string;
    };
}
/**
 * sinks represents outgoing paths for this track. For example, if we have a track that looks like { id: "1", mediaType: "audio", sinks: ["a", "b"] }
 * then we know that the audio of track "1" can be heard on tracks "a" and "b". Another way to say this is whichever participants are receiving
 * tracks "a" or "b" are hearing this participant
 */
export interface IMediaChangeEventParticipant {
    communicationId: string;
    userId: string;
    tracks: {
        id: string;
        mediaType: 'audio' | 'video';
        sinks?: string[];
    }[];
}
export default class VideoSessionHandler extends BaseSessionHandler {
    requestedSessions: {
        [roomJid: string]: boolean;
    };
    sessionType: any;
    shouldHandleSessionByJid(jid: string): boolean;
    findLocalParticipantInConversationUpdate(conversationUpdate: ConversationUpdate): IConversationParticipant | null;
    handleConversationUpdate(update: ConversationUpdate, sessions: VideoMediaSession[]): void;
    handleConversationUpdateForSession(conversationUpdate: ConversationUpdate, session: VideoMediaSession): void;
    updateParticipantsOnScreen(session: VideoMediaSession, mediaUpdateEvent: IMediaChangeEvent): void;
    updateSpeakers(session: IExtendedMediaSession, mediaUpdateEvent: IMediaChangeEvent): void;
    startSession(startParams: IStartVideoSessionParams): Promise<{
        conversationId: string;
    }>;
    handlePropose(pendingSession: IPendingSession): Promise<void>;
    handleSessionInit(session: VideoMediaSession): Promise<any>;
    acceptSession(session: VideoMediaSession, params: IAcceptSessionRequest): Promise<any>;
    checkInitialConversationParticipants(session: VideoMediaSession): Promise<void>;
    setInitialMuteStates(session: IExtendedMediaSession): Promise<void>;
    setupTransceivers(session: IExtendedMediaSession): void;
    endSession(conversationId: string, session: IExtendedMediaSession, reason?: Constants.JingleReasonCondition): Promise<void>;
    setVideoMute(session: IExtendedMediaSession, params: ISessionMuteRequest, skipServerUpdate?: boolean): Promise<void>;
    setAudioMute(session: IExtendedMediaSession, params: ISessionMuteRequest): Promise<void>;
    handleMediaChangeEvent(session: VideoMediaSession, event: IMediaChangeEvent): void;
    startScreenShare(session: VideoMediaSession): Promise<void>;
    stopScreenShare(session: VideoMediaSession): Promise<void>;
    pinParticipantVideo(session: IExtendedMediaSession, participantId?: string): Promise<void>;
    attachIncomingTrackToElement(track: MediaStreamTrack, { audioElement, videoElement, volume }: {
        audioElement?: HTMLAudioElement;
        videoElement?: HTMLVideoElement;
        volume: number;
    }): HTMLAudioElement | HTMLVideoElement;
    /**
     * Parse the trackId from a passed in SDP for a given media type
     *
     * SDP will look like:
     * ```
     * // global stuff...
     * m=audio 1 UDP/TLS/RTP/SAVPF 96
     * // info about the audio offer...
     * a=msid:cbf2ec37-5e50-4ac4-9ae7-1d1dc4508071 19d58781-f708-4945-be91-2758052273bd
     * m=video 1 UDP/TLS/RTP/SAVPF 97 98
     * // info about the video offer...
     * a=msid:cbf2ec37-5e50-4ac4-9ae7-1d1dc4508071 1e3d9e8b-d407-47ee-8dcf-6b5912889a28
     * ```
     *
     * `m=` acts as the delimiter for each audio/video track in the offer
     * `a=misd:{ID for the media stream} {ID for the media track (this is what we will look for)}
     *
     * @param sdp to parse
     * @param kind media type to look for
     */
    getTrackIdFromSdp(sdp: string, kind: 'video' | 'audio'): string;
    isMemberStatusMessage(message: JsonRpcMessage): message is IMemberStatusMessage;
    handleDataChannelMessage(session: VideoMediaSession, message: JsonRpcMessage): void;
    handleMemberStatusMessage(message: IMemberStatusMessage, session: VideoMediaSession): void;
}
