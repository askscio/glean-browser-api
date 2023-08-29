import { PropsWithChildren } from "react";
import Header from "./Header";

const PageLayout = ({ children }: PropsWithChildren) => (
  <div className="w-full h-full flex flex-col items-center">
    <Header />
    <main role="main" className="w-full flex-auto pt-4">
      {children}
    </main>
    <div className="fixed flex items-center text-white justify-center bottom-[0px] w-full h-12 bg-slate-600 opacity-90 text-center">
      Contact Support
    </div>
    <div style={{ height: '900px', marginTop: '24px', width: '100%', background: '#efefef', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
      Footer content
    </div>
  </div>
);

export default PageLayout;
