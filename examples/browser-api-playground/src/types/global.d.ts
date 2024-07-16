import type { EmbeddedSearch } from "@gleanwork/web-sdk";

declare global {
  interface Window {
    GleanWebSDK?: EmbeddedSearch;
    setConfig: (config: any) => void;
  }
}