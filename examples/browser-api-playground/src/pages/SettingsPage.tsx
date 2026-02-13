import { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { EmbedConfigContext, authOptionsKey, baseOptionsKey } from "../EmbedConfigContext";
import useAuthProvider from "../useAuthProvider";


const SettingsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {config} = useContext(EmbedConfigContext)
  const authParams = useAuthProvider(config[authOptionsKey], config[baseOptionsKey].backend)

  useEffect(() => {
    if (!window.GleanWebSDK) return;

    const settingsCustomConfig = {
      ...config[baseOptionsKey],
    }

    containerRef.current && window.GleanWebSDK.renderSettings(containerRef.current, {
      ...settingsCustomConfig,
      ...authParams,
      ...{ hideUnconfigurableDatasources: true}
    });
  }, [config, authParams]);

  return (
    <div
      className="w-1/2 h-full relative mx-auto mt-10"
      ref={containerRef}
    >
    </div>
  );
};

export default SettingsPage;
