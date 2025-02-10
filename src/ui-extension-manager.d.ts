import { UIExtension } from "./extension-types";

export interface UIExtensionManager {
    registerUIExtension(extension: UIExtension): void;
    setUIReady(): void;
}