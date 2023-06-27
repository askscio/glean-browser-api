import { NavLink } from "react-router-dom";
import SearchBox from "./SearchBox";

const Header = () => (
  <header>
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 z-50">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <NavLink to="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Example
          </span>
        </NavLink>
        <SearchBox />
      </div>
    </nav>
  </header>
);

export default Header;
