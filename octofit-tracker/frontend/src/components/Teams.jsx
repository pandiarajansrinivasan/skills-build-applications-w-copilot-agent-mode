import ResourceList from './ResourceList.jsx'
const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const teamsEndpoint = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/teams/` : 'http://localhost:8000/api/teams/'
export default function Teams() { return <ResourceList collection="teams" endpoint={teamsEndpoint} title="Teams" description="Find your crew, see who is participating, and keep the momentum going." accent="teal" /> }