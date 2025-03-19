import { GenesysCloudWebrtcSdk } from './client';
import { SubscriptionEvent } from './types/interfaces';
/**
 * Establish the connection with the streaming client.
 *  Must be called after construction _before_ the SDK is used.
 * @param this must be called with a GenesysCloudWebrtcSdk as `this`
 */
export declare function setupStreamingClient(this: GenesysCloudWebrtcSdk): Promise<void>;
/**
 * Set up proxy for streaming client events
 * @param this must be called with a GenesysCloudWebrtcSdk as `this`
 */
export declare function proxyStreamingClientEvents(this: GenesysCloudWebrtcSdk): Promise<void>;
export declare const handleConversationUpdate: (this: GenesysCloudWebrtcSdk, updateEvent: SubscriptionEvent) => void;
export declare const handleDisconnectedEvent: (this: GenesysCloudWebrtcSdk) => void;
