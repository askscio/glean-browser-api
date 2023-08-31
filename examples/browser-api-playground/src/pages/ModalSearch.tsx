import { Divider, Input, Select, Typography } from "antd";
import { useEffect, useState } from "react";
import NativeSearchBox from "../components/NativeSearchBox";

const Playground = () => (
  <div>
    <Typography.Paragraph> Basic NSR setup - configurable through sidebar(Options + SearchOptions)</Typography.Paragraph>
    <NativeSearchBox />
  </div>
)

const MultipleNSRAttachments = () => {
  useEffect(() => {
    document.querySelectorAll('input[data-form-input-type="github-search"]').forEach((element) => {
      window.EmbeddedSearch.attach(element, {
        datasourcesFilter: ['github'],
        key: 'group-1',
      })
    })
    document.querySelectorAll('input[data-form-input-type="jira-search"]').forEach((element) => {
      window.EmbeddedSearch.attach(element, {
        datasourcesFilter: ['jira'],
        key: 'group-2',
      })
    })
  }, [])

  return (
    <div>
      <Typography.Title level={4}>Using Github as a datasource filter</Typography.Title>
      <Input data-form-input-type='github-search' type='search' placeholder="Search..." className="mb-4" />
      <Input data-form-input-type='github-search' type='search' placeholder="Search..." className="mb-4" />
      <Typography.Title level={4} >Using JIRA as a datasource filter</Typography.Title>
      <Input data-form-input-type='jira-search' type='search' placeholder="Search..." className="" />
    </div>
  )
}

const BasicNSR = () => {

  useEffect(() => {
    window.EmbeddedSearch.attach(document.getElementById('basic-nsr-target'))
  }, [])

  return <Input id='basic-nsr-target' type='search' placeholder="Search..."/>
}

/**
 * A naive id generator
 */
const withId = (item: any, index: number) => ({ id: item.title.replace(/[^a-zA-Z0-9 ]/g, ""), ...item })

const allScenes = [
  { title: 'Modal search playground', renderer: Playground },
  { title: 'Modal search without any configuration', renderer: BasicNSR },
  { title: 'Multiple modal search attachments in the same page', renderer: MultipleNSRAttachments },
].map(withId)

const ModalSearch = () => {
  // Note: Title is usually not a great idea, but should be okay here
  const [activeSceneId, setActiveSceneId] = useState(allScenes[0].id)
  
  const activeScene = allScenes.find(scene => scene.id === activeSceneId)
  const { renderer: Renderer, title } = activeScene

  return (
    <div className="w-full m-auto">
      <div className="bg-slate-200 p-8">
        <Typography.Title level={3}>Native search replacement with Glean</Typography.Title>
        <Typography.Title level={5}>Select a scene</Typography.Title>
        <Typography.Paragraph>Scenes are pre-curated scenarios that can apply to specific use-cases</Typography.Paragraph>
        <Select
          style={{ width: '100%' }}
          defaultValue={activeSceneId}
          onChange={setActiveSceneId}
          options={allScenes.map(scene => ({ value: scene.id, label: scene.title } ))}
        />
      </div>
      <div className="p-8">
        <Typography.Title level={3}>{title}</Typography.Title>
        <Renderer />
      </div>
    </div>
  )
}

export default ModalSearch;
