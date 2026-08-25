import ResourceList from './ResourceList.jsx'
const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const activitiesEndpoint = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/activities/` : 'http://localhost:8000/api/activities/'
export default function Activities() { return <ResourceList collection="activities" endpoint={activitiesEndpoint} title="Activity log" description="Every run, ride, walk, and strength session in one clear view." accent="coral" /> }