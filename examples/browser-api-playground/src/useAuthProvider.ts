import { EmbedConfigContext, authTypeKey, baseOptionsKey } from "./EmbedConfigContext";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AuthType } from "./types";

interface AuthState {
    onAuthTokenRequired: () => void;
    authToken?: string;
}

const defaultAuthState: AuthState = {
    onAuthTokenRequired: () => {},
};

const fetchTokenFromServer = async ({backend}: {backend: string}): Promise<string> => {
    return await new Promise((resolve, reject) => fetch('http://localhost:8585/generateAuthToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({backend}),
    })
    .then(response => response.json())
    .then(data => resolve(data.token))
    .catch(error => reject(error)));
}

const useAuthProvider = (authType: AuthType, backend: string) => {
    const [authState, setAuthState] = useState<AuthState>(defaultAuthState)
    const updateAuthToken = useCallback((authToken: string) => setAuthState((prevAuthState: AuthState) => {
        return {
            ...prevAuthState,
            authToken,
        };
    }), [setAuthState]);

    useEffect(() => {
        switch (authType) {
            case AuthType.ServerSide:
                (async () => {
                    const authToken = await fetchTokenFromServer({backend});
                    setAuthState({
                        onAuthTokenRequired: async () => {
                            const authToken = await fetchTokenFromServer({backend});
                            updateAuthToken(authToken);
                        },
                        authToken: authToken,
                    });
                })();
            case AuthType.Anonymous: {
                (async () => {
                    const authProvider = window.EmbeddedSearch.createGuestAuthProvider({backend})
                    const authToken = await authProvider.getAuthToken();
                    setAuthState({
                        onAuthTokenRequired: async () => {
                            const authToken = await authProvider.createAuthToken();
                            updateAuthToken(authToken);
                        },
                        authToken: authToken,
                    });
                })();
            }
            case AuthType.Default:
                setAuthState(defaultAuthState);
        }
    }, [backend, authType, updateAuthToken]);

    return authState;
}

export default useAuthProvider;