import { useCallback, useContext } from 'react'
import ReactJsonView, { InteractionProps } from 'react-json-view'
import { ConfigType, EmbedConfigContext } from '../EmbedConfigContext'
import { Drawer } from 'antd'

interface SettingsDrawerProps {
    open: boolean
    onClose: () => void
}

const SettingsDrawer = ({open, onClose}: SettingsDrawerProps) => {
    const {config, setConfig} = useContext(EmbedConfigContext)
    const handleJsonUpdate = useCallback((props: InteractionProps) => setConfig(props.updated_src as ConfigType), [])

    return (
    <Drawer 
        title="Settings" 
        mask={false} 
        placement="right" 
        onClose={onClose} 
        open={open}
        width={500}
    >
        <ReactJsonView 
            name="Configurable Props" 
            collapsed={1} 
            defaultValue={undefined}
            displayDataTypes 
            displayObjectSize={false} 
            onAdd={handleJsonUpdate}
            onDelete={handleJsonUpdate}
            onEdit={handleJsonUpdate}
            src={config}
            validationMessage=""
        />
    </Drawer>)
}

export default SettingsDrawer