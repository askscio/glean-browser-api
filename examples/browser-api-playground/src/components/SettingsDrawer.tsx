import { useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react'
import ReactJsonView, { InteractionProps } from 'react-json-view'
import { ConfigType, EmbedConfigContext, defaultConfig } from '../EmbedConfigContext'
import { Button, Drawer, Tooltip, message } from 'antd'
import { CopyOutlined, ReloadOutlined } from '@ant-design/icons'

interface SettingsDrawerProps {
    open: boolean
    onClose: () => void
}

const SettingsDrawer = ({open, onClose}: SettingsDrawerProps) => {
    const {config, setConfig} = useContext(EmbedConfigContext)
    const [draftConfig, setDraftConfig] = useState<ConfigType>(config) 
    
    useLayoutEffect(() => {
        setDraftConfig(config)
    }, [config])

    const handleReset = useCallback(() => setConfig(defaultConfig), [config])
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(JSON.stringify(draftConfig))
        message.success('Copied to clipboard')
    }, [draftConfig])
    
    const handleJsonUpdate = useCallback((props: InteractionProps) => setDraftConfig(props.updated_src as ConfigType), [])
    const handlePublish = useCallback(() => {
        setConfig(draftConfig)
        message.success('Sucessfully published')
    }, [draftConfig])
    const handleCancel = useCallback(() => setDraftConfig(config), [config])

    const isEditing = useMemo(() => config !== draftConfig, [config, draftConfig])

    return (
    <Drawer 
        title={<div style={{display: 'inline-flex', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                Settings{' '}
                <div style={{display: 'inline-flex', columnGap: '20px', marginRight: 30}}>
                    <Tooltip title="Reset to default" placement="top"><ReloadOutlined onClick={handleReset}/></Tooltip>
                    <Tooltip title="Copy as JSON" placement="top"><CopyOutlined onClick={handleCopy}/></Tooltip>
                </div>
            </div>} 
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
            src={draftConfig}
            validationMessage=""
        />
        {isEditing && (
            <div style={{display: 'inline-flex', columnGap: 25, marginTop: 20, float: 'right', marginRight: 30}}>
                <Button size="middle" onClick={handleCancel}>Cancel</Button>
                <Button size="middle" onClick={handlePublish}>Publish</Button>
            </div>
        )}
    </Drawer>)
}

export default SettingsDrawer