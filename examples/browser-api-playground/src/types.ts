import type { Options } from '@gleanwork/web-sdk'

export const enum AuthType {
    Default = 'default',
    ServerSide = 'server-side',
    Anonymous = 'anonymous'
}

export interface AuthOptions {
    type: AuthType;
    actAs?: string;
    apiKey?: string;
}
  
export const enum EmbeddedSearchWidget {
    SearchBox = 'Search Box',
    SearchResults = 'Search Results',
    Chat = 'Chat',
} 

// TODO: Remove authMethod when types package is updated
export type BaseOptions = Options & { authMethod?: 'sso' | 'token'}