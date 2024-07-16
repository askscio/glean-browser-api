import type { GleanWebSDK } from "@gleanwork/web-sdk";

declare global {
  interface Window {
    GleanWebSDK?: GleanWebSDK;
  }
}