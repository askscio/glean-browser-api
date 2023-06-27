import { PropsWithChildren } from "react";
import Header from "./Header";

const PageLayout = ({ children }: PropsWithChildren) => (
  <div className="w-full h-full flex flex-col items-center">
    <div className="w-fixed w-full flex-shrink flex-grow-0 px-4 w-fixed w-full flex-shrink flex-grow-0 px-4 border-b border-gray-20 shadow-md">
      <div className="sticky top-0 p-4 w-full h-full z-50">
        <Header />
      </div>
    </div>
    <main role="main" className="w-full flex-auto">
      {children}
    </main>
  </div>
);

export default PageLayout;
