import { PropsWithChildren } from "react";
import Header from "./Header";
import { EmbedConfigContext } from "../../EmbedConfigContext";
import useConfigStore from "../../useConfigStore";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

const PageLayout = ({ children }: PropsWithChildren) => {
  const contextValue = useConfigStore()

  return <EmbedConfigContext.Provider value={contextValue}>
    <Layout className="h-full w-full">
      <Header />
      <Content role="main" className="w-full flex-auto bg-white">
        {children}
      </Content>
    </Layout>
  </EmbedConfigContext.Provider>
};

export default PageLayout;
