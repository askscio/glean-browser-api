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
    webAppUrl: undefined,
    debug: undefined,
    disableAssistant: undefined,
    docURL: undefined,
    enable3PCookieAccessRequest: undefined,
    fontFamily: undefined,
    fontSize: undefined,
    key: undefined,
    organizationId: undefined,
    unauthorizedMessage: undefined,
    useCase: undefined,
    fontFaces: []
}

const searchOptons = {
    datasource: undefined,
    datasourcesFilter: [],
    filters: [],
    hideAutocomplete: undefined,
    initialFilters: [],
    query: undefined
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
export const sdkOptionsKey = 'SDK Options';

export const fontFacesKey = 'Font Faces';
export const searchBoxKey = 'Search Box';
export const searchResultsKey = 'Search Results';
export const chatOptionsKey = 'Chat Options';
export const recommendationsOptionsKey = 'Recommendations Options';
export const sidePanelOptionsKey = 'Side Panel Options';
export const modalSearchOptionsKey = 'Modal Search Options';
export const eventHandlersKey = 'Event Handlers';

const useNpm = new URLSearchParams(location.search).has('useNpm')

export const defaultConfig = {
    [sdkOptionsKey]: {
        source: useNpm ? 'npm' : "https://canary.glean.com/embedded-search-latest.min.js",
        integrity: ""
    },
    [authOptionsKey]: {
        type: AuthType.Default,
        actAs: undefined,
        apiKey: undefined,
        authToken: undefined,
    },
    [baseOptionsKey]: baseOptions,
    [searchOptionsKey]: searchOptons,
    [EmbeddedSearchWidget.SearchBox]: {
        autofocus: true,
        searchBoxCustomizations: {
            ...boxOptions,
            borderRadius: 24,
            boxShadow: "none",
            placeholderText: "Search for anything...",
            fontSize: undefined,
            searchIconUrl: undefined
        },
    },
    [EmbeddedSearchWidget.SearchResults]: {
        hideDatasourceFilter: false,
        hideTopBarFilters: false,
        showAutocompleteContent: false,
        showHomePageContent: false,
        showInlineSearchBox: false,
        defaultResultTabs: undefined,
        hideDatasourceFilterSelector: undefined,
        hideFiltersColumn: undefined,
        paginated: undefined,
        topBarFilterOverrides: []
    },
    [EmbeddedSearchWidget.Chat]: {
        customizations: { 
            container: makeValuesUndefined(boxOptions),
            features: {
                agentLibrary: undefined,
                applicationLibrary: undefined,
                chatMenu: undefined,
                chatSettings: undefined,
                clearChat: undefined,
                createPrompt: undefined,
                feedback: undefined,
                newChatButton: undefined,
                promptLibrary: undefined
            },
            login: {
                hideLogo: undefined
            }
        },
        initialMessage: undefined,
        agent: undefined,
        agentId: undefined,
        applicationId: undefined,
        chatId: undefined,
        landingPage: undefined,
        promptId: undefined,
        restrictToApplication: undefined,
        showAdvancedChatBarOptions: undefined,
        source: undefined
    },
    [EmbeddedSearchWidget.Recommendations]: {
        expandable: undefined,
        height: undefined,
        sourceDocument: undefined,
        customizations: {
            ...makeValuesUndefined(boxOptions),
            searchBox: {
                searchIconUrl: undefined,
                placeholderText: undefined,
                fontSize: undefined
            },
            showNoRecommendationsHint: undefined
        }
    },
    [EmbeddedSearchWidget.SidePanel]: {
        hostMeta: {
            platform: undefined,
            version: undefined
        },
        widgetConfigs: {
            customPrompt: {
                disabled: undefined
            },
            search: {
                disabled: undefined
            },
            suggestedNextSteps: {
                disabled: undefined
            },
            composer: {
                disabled: undefined,
                initialContent: undefined
            }
        },
        datasourcesFilter: [],
        sourceDocument: undefined
    },
    [EmbeddedSearchWidget.ModalSearch]: {
        showNativeSearchToggle: undefined,
        searchBoxCustomizations: makeValuesUndefined(boxOptions)
    },
    [eventHandlersKey]: {
        onAuthTokenRequired: undefined,
        onChat: undefined,
        onCopy: undefined,
        onDatasourceChange: undefined,
        onDetach: undefined,
        onDraftExport: undefined,
        onResize: undefined,
        onSearch: undefined
    }
}

export type ConfigType = typeof defaultConfig;

const defaultContext = {
    config: defaultConfig,
    setConfig: (config: ConfigType) => {},
}

export const EmbedConfigContext = createContext(defaultContext);