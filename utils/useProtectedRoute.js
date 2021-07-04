import { getSession, signIn } from "next-auth/client";
import { useEffect } from "react";

function useProtectedRoute() {
  useEffect(() => {
    (async function _() {
      const sess = await getSession();
      if (!sess) {
        signIn();
      }
    })();
  }, []);
}

export default useProtectedRoute;
