import { Constants } from 'stanza';
import { IPendingSession, IExtendedMediaSession, ScreenRecordingMediaSession, IAcceptSessionRequest, IUpdateOutgoingMedia } from '../types/interfaces';
import BaseSessionHandler from './base-session-handler';
export default class ScreenRecordingSessionHandler extends BaseSessionHandler {
    requestedSessions: {
        [roomJid: string]: boolean;
    };
    sessionType: any;
    shouldHandleSessionByJid(jid: string): boolean;
    handleConversationUpdate(): void;
    handlePropose(pendingSession: IPendingSession): Promise<void>;
    acceptSession(session: ScreenRecordingMediaSession, params: IAcceptSessionRequest): Promise<any>;
    private sendMetadataWhenSessionConnects;
    endSession(conversationId: string, session: IExtendedMediaSession, reason?: Constants.JingleReasonCondition): Promise<void>;
    updateOutgoingMedia(session: IExtendedMediaSession, options: IUpdateOutgoingMedia): never;
    private updateScreenRecordingMetadatas;
}
