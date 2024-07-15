import { useCallback, useMemo, useState } from "react";
import { ConfigType, baseOptionsKey, defaultConfig, sdkOptionsKey } from "./EmbedConfigContext";
import { merge } from "lodash";

const storeKey = "embedded-search-config";

const shouldReload = (prevValue: ConfigType, newValue: ConfigType) => {
    const baseOptionReloadKeys = ['backend', 'webAppUrl'] as const;
    for (const key of baseOptionReloadKeys) {
        if (prevValue[baseOptionsKey][key] !== newValue[baseOptionsKey][key]) {
            return true
        }
    }

    const sdkOptionReloadKeys = ['source', 'integrity'] as const;
    for (const key of sdkOptionReloadKeys) {
        if (prevValue[sdkOptionsKey][key] !== newValue[sdkOptionsKey][key]) {
            return true
        }
    }
    return false
}

const useConfigStore = () => {
    const [config, setConfig] = useState<ConfigType>(() => {
        const value = window.sessionStorage.getItem(storeKey)
        return value ? merge({}, defaultConfig, JSON.parse(value)) : defaultConfig
    });

    const setPersistentConfig = useCallback((newValue: ConfigType) => setConfig((prevValue: ConfigType) => {
        window.sessionStorage.setItem(storeKey, JSON.stringify(newValue));
        // Reload page if backend URL or webAppUrl changes
        if (shouldReload(prevValue, newValue)) {
            window.location.reload();
        }
        return newValue;
    }), [setConfig]);

    window.setConfig = setPersistentConfig;
    return useMemo(() => ({config, setConfig: setPersistentConfig}), [config, setPersistentConfig]);
}

export default useConfigStore;