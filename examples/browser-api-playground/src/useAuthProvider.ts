import { useCallback, useEffect, useState } from "react";
import { AuthType } from "./types";

interface AuthState {
  onAuthTokenRequired: () => void;
  authToken?: string;
}

const defaultAuthState: AuthState = {
  onAuthTokenRequired: () => {},
};

const serverBasePath = (() => {
  const feBasePath = window.location.origin;
  return feBasePath.replace(/-\d{4}\./, "-8585.");
})();

const fetchTokenFromServer = async (
  backend: string,
  authType: AuthType.Anonymous | AuthType.ServerSide
): Promise<string> => {
  const endpoint =
    authType == AuthType.Anonymous
      ? "generateAnonymousAuthToken"
      : "generateAuthToken";
  return await new Promise((resolve, reject) =>
    fetch(`${serverBasePath}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ backend }),
    })
      .then((response) => response.json())
      .then((data) => resolve(data.token))
      .catch((error) => reject(error))
  );
};

const useAuthProvider = (authType: AuthType, backend: string) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
  const updateAuthToken = useCallback(
    (authToken: string) =>
      setAuthState((prevAuthState: AuthState) => {
        return {
          ...prevAuthState,
          authToken,
        };
      }),
    [setAuthState]
  );

  useEffect(() => {
    switch (authType) {
      case AuthType.ServerSide:
      case AuthType.Anonymous: {
        (async () => {
          const authToken = await fetchTokenFromServer(backend, authType);
          setAuthState({
            onAuthTokenRequired: async () => {
              const authToken = await fetchTokenFromServer(backend, authType);
              updateAuthToken(authToken);
            },
            authToken: authToken,
          });
        })();
        break;
      }
      case AuthType.Default:
        setAuthState(defaultAuthState);
    }
  }, [backend, authType, updateAuthToken]);

  return authState;
};

export default useAuthProvider;
