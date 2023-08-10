import { createContext } from "react";

// Note: Don't use undefined in the default config, as it will be stripped out by JSON.stringify
const baseOptions = {
    authToken: null,
    backend: 'https://salessavvy-test-be.glean.com',
    disableAnalytics: false,
    domainsToOpenInCurrentTab: [],
    urlsToOpenInCurrentTab: [],
    enableActivityLogging: true,
    locale: null,
    themeVariant: 'auto',
    theme: {},
    webAppUrl: "https://canary.glean.com"
}

const searchOptons = {
    datasource: null,
    datasourcesFilter: [],
}

const boxOptions = {
    border: null,
    borderRadius: 8,
    boxShadow: 'none',
    horizontalMargin: 0,
    verticalMargin: 0,
}

export const baseOptionsKey = 'Options';
export const searchOptionsKey = 'Search Options';

export const enum EmbeddedSearchWidget {
    SearchBox = 'Search Box',
    SearchResults = 'Search Results',
    Chat = 'Chat',
}

export const defaultConfig = {
    [baseOptionsKey]: baseOptions,
    [searchOptionsKey]: searchOptons,
    [EmbeddedSearchWidget.SearchBox]: {
        autofocus: true,
        searchBoxCustomizations: {
            ...boxOptions,
            borderRadius: 24,
            boxShadow: "none",
            placeholderText: "Search for anything..."
        },
    },
    [EmbeddedSearchWidget.SearchResults]: {
        hideDatasourceFilter: false,
        hideTopBarFilters: false,
        showAutocompleteContent: false,
        showHomePageContent: false,
        showInlineSearchBox: false,
    },
    [EmbeddedSearchWidget.Chat]: {
        customizations: {
            container: boxOptions,
        },
        initialMessage: "Who can I ask about Embedded Search", 
    },
}

export type ConfigType = typeof defaultConfig;

const defaultContext = {
    config: defaultConfig,
    setConfig: (config: ConfigType) => {},
}

export const EmbedConfigContext = createContext(defaultContext);