import { Observable, Subject } from 'rxjs';
import { ConsumedHeadsetEvents, VendorImplementation } from 'softphone-vendor-headsets';
import GenesysCloudWebrtcSdk from '../client';
export interface ISdkHeadsetService {
    headsetEvents$: Observable<ConsumedHeadsetEvents>;
    currentSelectedImplementation: VendorImplementation;
    updateAudioInputDevice(newMicId: string): void;
    showRetry(): boolean;
    retryConnection(micLabel: string): Promise<void>;
    setRinging(callInfo: {
        conversationId: string;
        contactName?: string;
    }, hasOtherActiveCalls: boolean): Promise<void>;
    outgoingCall(callInfo: {
        conversationId: string;
        contactName?: string;
    }): Promise<void>;
    endCurrentCall(conversationId: string): Promise<void>;
    endAllCalls(): Promise<void>;
    answerIncomingCall(conversationId: string, autoAnswer: boolean): Promise<void>;
    rejectIncomingCall(conversationId: string): Promise<void>;
    setMute(isMuted: boolean): Promise<void>;
    setHold(conversationId: string, isHeld: boolean): Promise<void>;
}
export declare abstract class SdkHeadsetBase implements ISdkHeadsetService {
    protected sdk: GenesysCloudWebrtcSdk;
    headsetEvents$: Observable<ConsumedHeadsetEvents>;
    /**
     * Gets the currently selected vendor implementation from the headset library
     * @params none
     * @returns VendorImplementation
     */
    get currentSelectedImplementation(): VendorImplementation;
    constructor(sdk: GenesysCloudWebrtcSdk);
    /**
     * Updates the selected device and implementation within the headset library
     * @param newMicId ID associated with the newly selected device
     * @returns void
     */
    updateAudioInputDevice(_newMicId: string): void;
    /**
     * Determines if the retry button is necessary to be rendered
     * @params none
     * @returns boolean
     */
    showRetry(): boolean;
    /**
     * Attempts to reconnect to the selected vendor's SDK
     * @param micLabel the label that matches the currently selected device
     * @returns Promise<void>
     */
    retryConnection(_micLabel: string): Promise<void>;
    /**
     * Calls the headset library's incomingCall function to signal to the device
     * to flash the answer call button's light to show an incoming call
     * @param callInfo an object containing the conversationId and possible
     * contactName for the incoming call that will be accepted or rejected
     * @param hasOtherActiveCalls boolean determining if there are other active calls
     * @returns Promise<void>
     */
    setRinging(_callInfo: {
        conversationId: string;
        contactName?: string;
    }, _hasOtherActiveCalls: boolean): Promise<void>;
    /**
     * Calls the headset library's outgoingCall function to signal to the device
     * to switch on the answer call button's light to show an active call
     * @param callInfo an object containing the conversationId and possible
     * contactName for the call that is outgoing
     * @returns Promise<void>
     */
    outgoingCall(_callInfo: {
        conversationId: string;
        contactName?: string;
    }): Promise<void>;
    /**
     * Calls the headset library's endCall function to signal to the device
     * to switch off the answer call button's light to show the active call has ended
     * @param conversationId a string representing the conversation that needs to be ended
     * @returns Promise<void>
     */
    endCurrentCall(_conversationId: string): Promise<void>;
    /**
     * Calls the headset library's endAllCalls() function to signal the device
     * to switch off the answer call button's light to show the active calls have all ended
     * @returns Promise<void>
     */
    endAllCalls(): Promise<void>;
    /**
     * Calls the headset library's answerIncomingCall function to signal the device
     * to switch on the answer call button's light to show the call is now active
     * @param conversationId a string representing the incoming call that is being
     * answered
     * @returns Promise<void>
     */
    answerIncomingCall(_conversationId: string, _autoAnswer: boolean): Promise<void>;
    /**
     * Calls the headset library's rejectIncomingCall function to signal the device
     * to switch on the answer call button's light to show the call has been rejected
     * @param conversationId a string representing the incoming call that is being
     * rejected
     * @returns Promise<void>
     */
    rejectIncomingCall(_conversationId: string): Promise<void>;
    /**
     * Calls the headset library's setMute function to signal the device to switch on
     * or off (depending on the value of the passed in param) the mute call button's
     * light to show the call has been muted or unmuted respectively
     * @param isMuted boolean to show if the call should be muted(true) or unmuted(false)
     * @returns Promise<void>
     */
    setMute(_isMuted: boolean): Promise<void>;
    /**
     * Calls the headset library's setHold function to signal the device to switch on
     * or off (depending on the value of the passed in param, isHeld) the hold call button's
     * light to show the call has been held or resumed respectively
     * @param conversationId string representing the call that is to be held or resumed
     * @param isHeld boolean to show if the call should be held(true) or resumed(false)
     * @returns Promise<void>
     */
    setHold(_conversationId: string, _isHeld: boolean): Promise<void>;
}
export declare class SdkHeadsetService extends SdkHeadsetBase {
    private headsetLibrary;
    headsetEvents$: Observable<ConsumedHeadsetEvents>;
    constructor(sdk: GenesysCloudWebrtcSdk);
    /**
     * Updates the selected device and implementation within the headset library
     * @param newMicId ID associated with the newly selected device
     * @returns void
     */
    updateAudioInputDevice(newMicId: string): void;
    /**
     * Gets the currently selected vendor implementation from the headset library
     * @params none
     * @returns VendorImplementation
     */
    get currentSelectedImplementation(): VendorImplementation;
    /**
     * Determines if the retry button is necessary to be rendered
     * @params none
     * @returns boolean
     */
    showRetry(): boolean;
    /**
     * Attempts to reconnect to the selected vendor's SDK
     * @param micLabel the label that matches the currently selected device
     * @returns Promise<void>
     */
    retryConnection(micLabel: string): Promise<void>;
    /**
     * Calls the headset library's incomingCall function to signal to the device
     * to flash the answer call button's light to show an incoming call
     * @param callInfo an object containing the conversationId and possible
     * contactName for the incoming call that will be accepted or rejected
     * @param hasOtherActiveCalls boolean determining if there are other active calls
     * @returns Promise<void>
     */
    setRinging(callInfo: {
        conversationId: string;
        contactName?: string;
    }, hasOtherActiveCalls: boolean): Promise<void>;
    /**
     * Calls the headset library's outgoingCall function to signal to the device
     * to switch on the answer call button's light to show an active call
     * @param callInfo an object containing the conversationId and possible
     * contactName for the call that is outgoing
     * @returns Promise<void>
     */
    outgoingCall(callInfo: {
        conversationId: string;
        contactName: string;
    }): Promise<void>;
    /**
     * Calls the headset library's endCall function to signal to the device
     * to switch off the answer call button's light to show the active call has ended
     * @param conversationId a string representing the conversation that needs to be ended
     * @returns Promise<void>
     */
    endCurrentCall(conversationId: string): Promise<void>;
    /**
     * Calls the headset library's endAllCalls() function to signal the device
     * to switch off the answer call button's light to show the active calls have all ended
     * @returns Promise<void>
     */
    endAllCalls(): Promise<void>;
    /**
     * Calls the headset library's answerIncomingCall function to signal the device
     * to switch on the answer call button's light to show the call is now active
     * @param conversationId a string representing the incoming call that is being
     * answered
     * @returns Promise<void>
     */
    answerIncomingCall(conversationId: string, autoAnswer: boolean): Promise<void>;
    /**
     * Calls the headset library's rejectIncomingCall function to signal the device
     * to switch on the answer call button's light to show the call has been rejected
     * @param conversationId a string representing the incoming call that is being
     * rejected
     * @returns Promise<void>
     */
    rejectIncomingCall(conversationId: string): Promise<void>;
    /**
     * Calls the headset library's setMute function to signal the device to switch on
     * or off (depending on the value of the passed in param) the mute call button's
     * light to show the call has been muted or unmuted respectively
     * @param isMuted boolean to show if the call should be muted(true) or unmuted(false)
     * @returns Promise<void>
     */
    setMute(isMuted: boolean): Promise<void>;
    /**
     * Calls the headset library's setHold function to signal the device to switch on
     * or off (depending on the value of the passed in param, isHeld) the hold call button's
     * light to show the call has been held or resumed respectively
     * @param conversationId string representing the call that is to be held or resumed
     * @param isHeld boolean to show if the call should be held(true) or resumed(false)
     * @returns Promise<void>
     */
    setHold(conversationId: string, isHeld: boolean): Promise<void>;
}
export declare class SdkHeadsetServiceStub extends SdkHeadsetBase {
    _fakeObservable: Subject<ConsumedHeadsetEvents>;
    headsetEvents$: Observable<ConsumedHeadsetEvents>;
    constructor(sdk: GenesysCloudWebrtcSdk);
}
export declare class HeadsetProxyService implements ISdkHeadsetService {
    protected sdk: GenesysCloudWebrtcSdk;
    private currentHeadsetService;
    private currentEventSubscription;
    private headsetEventsSub;
    headsetEvents$: Observable<ConsumedHeadsetEvents>;
    constructor(sdk: GenesysCloudWebrtcSdk);
    setUseHeadsets(useHeadsets: boolean): void;
    get currentSelectedImplementation(): VendorImplementation;
    updateAudioInputDevice(newMicDeviceId: string): void;
    showRetry(): boolean;
    retryConnection(micDeviceLabel: string): Promise<void>;
    setRinging(callInfo: {
        conversationId: string;
        contactName?: string;
    }, hasOtherActiveCalls: boolean): Promise<void>;
    outgoingCall(callInfo: {
        conversationId: string;
        contactName: string;
    }): Promise<void>;
    endCurrentCall(conversationId: string): Promise<void>;
    endAllCalls(): Promise<void>;
    answerIncomingCall(conversationId: string, autoAnswer: boolean): Promise<void>;
    rejectIncomingCall(conversationId: string): Promise<void>;
    setMute(isMuted: boolean): Promise<void>;
    setHold(conversationId: string, isHeld: boolean): Promise<void>;
}
