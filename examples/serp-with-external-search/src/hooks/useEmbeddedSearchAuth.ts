import { useCallback, useEffect, useMemo, useState } from "react"

/**
 * Manage authentication for Glean embedded search
 * @param backend URL for your Glean instance backend
 * @param isGuestUser Represents whether the active user is a guest (i.e., not logged in)
 * @returns 
 */
const useEmbeddedSearchAuth = (isGuestUser = true) => {

  const backend = 'https://YOUR_DOMAIN-be.glean.com/'

  const guestAuthProvider = useMemo(
    () => window.EmbeddedSearch.createGuestAuthProvider({ backend }),
    [backend]
  )
  const [authToken, setAuthToken] = useState(null)

  const refreshAuthToken = useCallback(() => {
    if (isGuestUser) {
      // Refresh the existing anonymnous auth token for guest users
      guestAuthProvider.createAuthToken().then(setAuthToken)
    } else {
      // TODO: For logged in users, fetch a user auth token
      // from your backend server and store in state
    }
  }, [guestAuthProvider])

  useEffect(() => {
    if (isGuestUser) {
      // Retrieve and reuse the stored anonymous token for guest users
      guestAuthProvider.getAuthToken().then(setAuthToken)
    } else {
      // TODO: For logged in users, fetch a user auth token
      // from your backend server and store in state
    }
  }, [])

  return { authToken, backend, refreshAuthToken }
}

export default useEmbeddedSearchAuth
