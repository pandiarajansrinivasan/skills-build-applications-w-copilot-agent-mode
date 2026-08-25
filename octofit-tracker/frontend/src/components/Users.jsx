import ResourceList from './ResourceList.jsx'
const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const usersEndpoint = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/users/` : 'http://localhost:8000/api/users/'
export default function Users() { return <ResourceList collection="users" endpoint={usersEndpoint} title="Athletes" description="A privacy-minded directory of active students and their progress." accent="blue" /> }