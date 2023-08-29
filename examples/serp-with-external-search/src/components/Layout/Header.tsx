import { NavLink } from "react-router-dom";
import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <header id='header' className={'p-4 w-full h-auto z-50 bg-white border-gray-200 px-4 lg:px-6 dark:bg-gray-800 z-50 w-fixed w-full flex-shrink flex-grow-0 px-4 w-fixed w-full flex-shrink flex-grow-0 px-4 border-b border-gray-20 shadow-md'}>
      <nav>
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <NavLink to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Example
            </span>
          </NavLink>
        </div>
        <div className="text-center p-4" style={{ background: '#efefef', marginTop: '12px', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SearchBox />
        </div>
      </nav>
    </header>
  )
}

export default Header;
