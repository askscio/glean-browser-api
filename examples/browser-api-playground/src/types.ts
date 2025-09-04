export const enum AuthType {
    Default = 'default',
    SSO = 'sso',
    Token = 'token',
    ServerSide = 'server-side',
    Anonymous = 'anonymous'
}

export interface AuthOptions {
    type: AuthType;
    actAs?: string;
    apiKey?: string;
    authToken?: {
        token: string;
        expirationTime: number;
    };
}
  
export const enum EmbeddedSearchWidget {
    SearchBox = 'Search Box',
    SearchResults = 'Search Results',
    Chat = 'Chat',
    Recommendations = 'Recommendations',
    SidePanel = 'Side Panel',
    ModalSearch = 'Modal Search'
} 