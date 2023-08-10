import { useCallback, useMemo, useState } from "react";
import { ConfigType, baseOptionsKey, defaultConfig } from "./EmbedConfigContext";
import _ from "lodash";

const storeKey = "embedded-search-config";

const useConfigStore = () => {
    const [config, setConfig] = useState<ConfigType>(() => {
        const value = window.sessionStorage.getItem(storeKey)
        return value ? _.merge(defaultConfig, JSON.parse(value)) : defaultConfig
    });

    const setPersistentConfig = useCallback((newValue: ConfigType) => setConfig((prevValue: ConfigType) => {
        window.sessionStorage.setItem(storeKey, JSON.stringify(newValue));
        // Reload page if backend URL or webAppUrl changes
        const keysToCheck = ['backend', 'webAppUrl'] as const;
        for (const key of keysToCheck) {
            if (prevValue[baseOptionsKey][key] !== newValue[baseOptionsKey][key])
                window.location.reload();
        }
        return newValue;
    }), [setConfig]);

    return useMemo(() => ({config, setConfig: setPersistentConfig}), [config, setPersistentConfig]);
}

export default useConfigStore;