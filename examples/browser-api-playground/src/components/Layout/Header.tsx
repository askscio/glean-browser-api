import { Menu, MenuProps, Layout } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SettingsDrawer from "../SettingsDrawer";
import useConfigStore from "../../useConfigStore";
import { sdkOptionsKey } from "../../EmbedConfigContext";

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: '/',
  },
  {
    label: 'Chat',
    key: '/chat',
  },
  {
    label: 'Autocomplete with search results',
    key: '/search',
  },
  {
    label: 'Modal search',
    key: '/modal-search',
  },
];

const Header = () => {
  const contextValue = useConfigStore()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
 
  const onClick: MenuProps['onClick'] = (e) => navigate(e.key);

  return (
    <Layout.Header className="bg-white w-full flex items-center flex-grow-0 px-4 w-fixed w-full flex-shrink flex-grow-0 px-4 border-b border-gray-20 shadow-md">
      <Menu
        mode="horizontal"
        selectedKeys={[pathname]}
        items={items}
        onClick={onClick}
        style={{width: '100%'}}
      />
      <div style={{display: "flex", lineHeight: "16px"}}>
        <span>current sdk source: {contextValue.config?.[sdkOptionsKey].source}</span>
        <button onClick={() => setSettingsOpen(true)} className="ml-auto">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="feather feather-settings"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </div>
      <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)}/>
    </Layout.Header>
  )
};

export default Header;
