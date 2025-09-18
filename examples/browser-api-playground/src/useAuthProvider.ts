import { useCallback, useEffect, useState } from "react";
import { AuthOptions, AuthType } from "./types";

interface AuthState {
  onAuthTokenRequired?: () => void;
  authToken?: any;
}

const defaultAuthState: AuthState = {
};

const serverBasePath = (() => {
  const feBasePath = window.location.origin;
  return feBasePath.replace("3000", "8585");
})();

const fetchTokenFromServer = async (
  backend: string,
  authOptions: AuthOptions
): Promise<string> => {
  const endpoint =
    authOptions.type == AuthType.Anonymous
      ? "generateAnonymousAuthToken"
      : "generateAuthToken";
  return await new Promise((resolve, reject) =>
    fetch(`${serverBasePath}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        backend, 
        actAs: authOptions.actAs, 
        apiKey: authOptions.apiKey,
      }),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error))
  );
};

const useAuthProvider = (authOptions: AuthOptions, backend?: string) => {
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
    if (!backend) {
      setAuthState(defaultAuthState)
      return
    }
    switch (authOptions.type) {
      case AuthType.ServerSide:
      case AuthType.Anonymous: {
        (async () => {
          const authToken = await fetchTokenFromServer(backend, authOptions);
          setAuthState({
            onAuthTokenRequired: async () => {
              const authToken = await fetchTokenFromServer(backend, authOptions);
              updateAuthToken(authToken);
            },
            authToken: authToken,
          });
        })();
        break;
      }
      case AuthType.Token: {
        setAuthState(authOptions.authToken 
          ? { authToken: authOptions.authToken } 
          : defaultAuthState
        );
        break;
      }
      case AuthType.Default:
        setAuthState(defaultAuthState);
    }
  }, [backend, authOptions, updateAuthToken]);

  return authState;
};

export default useAuthProvider;
