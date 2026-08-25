import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function formatValue(value) {
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'string' && value.length > 28) return value.slice(0, 28) + '...'
  return value ?? '-'
}

export default function ResourceList({ collection, endpoint, title, description, accent }) {
  const [items, setItems] = useState([])
  const [state, setState] = useState('loading')

  useEffect(() => {
    let active = true
    fetchCollection(collection, endpoint).then((data) => {
      if (active) { setItems(data); setState('ready') }
    }).catch(() => active && setState('error'))
    return () => { active = false }
  }, [collection, endpoint])

  const columns = items.length ? Object.keys(items[0]).filter((key) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(key)).slice(0, 5) : []

  return <section className="content-section"><div className="section-heading"><div><p className={`eyebrow ${accent}`}>OctoFit / {collection}</p><h1>{title}</h1><p className="lede">{description}</p></div><div className="count-badge"><strong>{items.length}</strong><span>records</span></div></div>{state === 'loading' && <div className="state-panel">Loading your {collection}...</div>}{state === 'error' && <div className="state-panel error">Could not reach the API. Check that the backend is running on port 8000.</div>}{state === 'ready' && !items.length && <div className="state-panel">No {collection} have been logged yet.</div>}{state === 'ready' && items.length > 0 && <div className="table-wrap"><table className="table align-middle mb-0"><thead><tr>{columns.map((column) => <th key={column}>{column.replace(/([A-Z])/g, ' $1')}</th>)}</tr></thead><tbody>{items.map((item) => <tr key={item._id || JSON.stringify(item)}>{columns.map((column) => <td key={column}>{formatValue(item[column])}</td>)}</tr>)}</tbody></table></div>}</section>
}