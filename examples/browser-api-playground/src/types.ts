export const enum AuthType {
    Default = 'default',
    ServerSide = 'server-side',
    Anonymous = 'anonymous'
}

export interface AuthOptions {
    type: AuthType;
    actAs?: string;
}
  
export const enum EmbeddedSearchWidget {
    SearchBox = 'Search Box',
    SearchResults = 'Search Results',
    Chat = 'Chat',
} 