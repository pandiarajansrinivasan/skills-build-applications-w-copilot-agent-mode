import ResourceList from './ResourceList.jsx'
const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const workoutsEndpoint = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/workouts/` : 'http://localhost:8000/api/workouts/'
export default function Workouts() { return <ResourceList collection="workouts" endpoint={workoutsEndpoint} title="Workout library" description="Short, approachable sessions matched to different goals and energy levels." accent="violet" /> }