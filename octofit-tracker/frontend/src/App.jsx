import { NavLink, Route, Routes } from 'react-router-dom'
import { API_BASE_URL } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [['/', 'Overview'], ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'], ['/teams', 'Teams'], ['/users', 'Athletes'], ['/workouts', 'Workouts']]

function Overview() {
  return <section className="content-section overview"><p className="eyebrow coral">OctoFit / your daily brief</p><h1>Move together.<br /><em>Feel stronger.</em></h1><p className="lede">A simple place to log progress, find your people, and turn small wins into a team habit.</p><div className="overview-grid"><div className="feature-note"><span>01</span><h2>Track the effort</h2><p>See activity, points, and momentum without digging through spreadsheets.</p><NavLink to="/activities">View activity <span aria-hidden="true">↗</span></NavLink></div><div className="feature-note warm"><span>02</span><h2>Find your edge</h2><p>Explore workouts and friendly rankings built for every starting point.</p><NavLink to="/workouts">Explore workouts <span aria-hidden="true">↗</span></NavLink></div></div></section>
}

function App() {
  return <div className="app-shell"><aside className="sidebar"><NavLink to="/" className="brand"><span className="brand-mark">O</span><span>OctoFit<small>TRACKER</small></span></NavLink><nav aria-label="Primary navigation">{navigation.map(([path, label]) => <NavLink key={path} to={path} end={path === '/'}>{label}</NavLink>)}</nav><div className="api-status"><span className="status-dot" />API connected<small>{API_BASE_URL}</small></div></aside><main><header className="topbar"><span>MERGINGTON HIGH SCHOOL</span><span className="season">FALL / 2026</span></header><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main></div>
}

export default App