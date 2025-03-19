import BaseSessionHandler from './base-session-handler';
import { IPendingSession, IStartSessionParams, IExtendedMediaSession, IUpdateOutgoingMedia, VideoMediaSession } from '../types/interfaces';
import { ConversationUpdate } from '../conversations/conversation-update';
export default class ScreenShareSessionHandler extends BaseSessionHandler {
    private _screenStreamPromise;
    sessionType: any;
    shouldHandleSessionByJid(jid: string): boolean;
    handleConversationUpdate(_update: ConversationUpdate, _sessions: IExtendedMediaSession[]): void;
    startSession(startParams: IStartSessionParams): Promise<MediaStream>;
    handlePropose(pendingSession: IPendingSession): Promise<void>;
    onTrackEnd(session: VideoMediaSession): Promise<void>;
    handleSessionInit(session: VideoMediaSession): Promise<void>;
    updateOutgoingMedia(session: IExtendedMediaSession, options: IUpdateOutgoingMedia): never;
}
