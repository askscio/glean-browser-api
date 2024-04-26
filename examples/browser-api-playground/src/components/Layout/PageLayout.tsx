import { PropsWithChildren, useEffect, useState } from "react";
import Header from "./Header";
import { EmbedConfigContext, sdkOptionsKey } from "../../EmbedConfigContext";
import useConfigStore from "../../useConfigStore";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

const PageLayout = ({ children }: PropsWithChildren) => {
  const [ready, setReady] = useState(false)
  const contextValue = useConfigStore()

  useEffect(() => {
    try {
      if (!contextValue.config?.[sdkOptionsKey]?.source) {
        throw new Error('No source URL provided')
      } else {
        const script = document.createElement('script')
        script.src = contextValue.config[sdkOptionsKey].source
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
