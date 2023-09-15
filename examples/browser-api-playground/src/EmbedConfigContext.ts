import { createContext } from "react";
import { AuthType, EmbeddedSearchWidget } from "./types";

const makeValuesUndefined = (obj: Object) => Object.fromEntries(Object.entries(obj).map(([key]) => ([key])))

const baseOptions = {
    authToken: undefined,
    backend: undefined,
    disableAnalytics: false,
    domainsToOpenInCurrentTab: [],
    urlsToOpenInCurrentTab: [],
    enableActivityLogging: true,
    locale: undefined,
    themeVariant: 'light',
    theme: {},
    webAppUrl: undefined
}

const searchOptons = {
    datasource: undefined,
    datasourcesFilter: [],
}

const boxOptions = {
    border: undefined,
    borderRadius: 8,
    boxShadow: 'none',
    horizontalMargin: 0,
    verticalMargin: 0,
}

export const baseOptionsKey = 'Options';
export const searchOptionsKey = 'Search Options';
export const authOptionsKey = 'Auth Options';

export const defaultConfig = {
    [authOptionsKey]: {
        type: AuthType.Default,
        actAs: undefined,
    },
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
        customizations: { container: makeValuesUndefined(boxOptions) },
        initialMessage: undefined,
    },
}

export type ConfigType = typeof defaultConfig;

const defaultContext = {
    config: defaultConfig,
    setConfig: (config: ConfigType) => {},
}

export const EmbedConfigContext = createContext(defaultContext);