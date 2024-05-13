import { useContext, useEffect, useRef } from "react";
import { EmbedConfigContext, authOptionsKey, baseOptionsKey, searchOptionsKey } from "../EmbedConfigContext";
import useAuthProvider from "../useAuthProvider";

const NativeSearchBox = () => {
  const containerRef = useRef(null);
  const {config} = useContext(EmbedConfigContext)
  const authParams = useAuthProvider()

  useEffect(() => {
    if (!window.EmbeddedSearch) return;

    const NativeSearchBoxCustomConfig = {
      ...config[baseOptionsKey],
      ...config[searchOptionsKey],
    }

    window.EmbeddedSearch.attach(containerRef.current, {
      ...NativeSearchBoxCustomConfig,
      ...authParams,
      // Add overrides to the custom config here
    });
  }, [config, authParams]);

  return (
    <input
      ref={containerRef}
      className="border-solid border-4 rounded-2xl"
      placeholder="Search"
      style={{
        padding: 15,
        height: 40,
        width: 220,
      }}
    />
  );
};

export default NativeSearchBox;
