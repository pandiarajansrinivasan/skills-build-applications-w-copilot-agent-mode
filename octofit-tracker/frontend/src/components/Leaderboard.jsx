import ResourceList from './ResourceList.jsx'
const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const leaderboardEndpoint = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/` : 'http://localhost:8000/api/leaderboard/'
export default function Leaderboard() { return <ResourceList collection="leaderboard" endpoint={leaderboardEndpoint} title="Leaderboard" description="Celebrate consistency and friendly competition across Mergington High." accent="gold" /> }