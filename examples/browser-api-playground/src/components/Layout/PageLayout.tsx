import { PropsWithChildren, useEffect, useState } from "react";
import Header from "./Header";
import { EmbedConfigContext, sdkOptionsKey } from "../../EmbedConfigContext";
import useConfigStore from "../../useConfigStore";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import GleanWebSDK from "@gleanwork/web-sdk"

const PageLayout = ({ children }: PropsWithChildren) => {
  const [ready, setReady] = useState(false)
  const contextValue = useConfigStore()

  useEffect(() => {
    try {
      const sdkSource = contextValue.config?.[sdkOptionsKey]?.source
      if (!sdkSource) {
        throw new Error('No source URL provided')
      }
      if (sdkSource === "GleanWebSDK") {
        window.GleanWebSDK = GleanWebSDK
        setReady(true)
      } else {
        const sdkIntegrity = contextValue.config?.[sdkOptionsKey]?.integrity

        const script = document.createElement('script')
        script.src = sdkSource
        if (sdkIntegrity) {
          // https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
          script.integrity = sdkIntegrity
          script.setAttribute('crossorigin', 'anonymous')
        }
        script.onload = () => {
          setReady(true)
        }
        document.head.appendChild(script)
      }
    } catch (e) {
      alert('Please provide a source URL in the "SDK Options" section of the config')
    }
  }, [])

  return <EmbedConfigContext.Provider value={contextValue}>
    <Layout className="h-full w-full">
      <Header />
      <Content role="main" className="w-full flex-auto bg-white">
        {ready ? children : "loading..."}
      </Content>
    </Layout>
  </EmbedConfigContext.Provider>
};

export default PageLayout;
