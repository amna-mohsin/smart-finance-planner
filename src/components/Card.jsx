// src/components/Card.jsx
export default function Card({ title, value, color }) {
  return (
    <div className="card" style={{ borderTop: `5px solid ${color}` }}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  )
}
