export declare const isWindows11: () => Promise<boolean | undefined>;
export declare const doBasicWebrtcSession: (iceServers: any[]) => Promise<void>;
export declare function setupWebrtcForWindows11(iceServers: any[]): Promise<void>;
