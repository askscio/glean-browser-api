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

    const sdkOptionReloadKeys = ['source'] as const;
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
        if (!value) return defaultConfig
        return JSON.parse(value)
    });

    const setPersistentConfig = useCallback((newValue: ConfigType) => setConfig((prevValue: ConfigType) => {
        const updatedConfig = merge({}, config, newValue)
        window.sessionStorage.setItem(storeKey, JSON.stringify(updatedConfig));
        // Reload page if backend URL or webAppUrl changes
        if (shouldReload(prevValue, updatedConfig)) {
            window.location.reload();
        }
        return updatedConfig;
    }), [setConfig]);

    window.setConfig = setPersistentConfig;
    return useMemo(() => ({config, setConfig: setPersistentConfig}), [config, setPersistentConfig]);
}

export default useConfigStore;