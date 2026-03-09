export default function DashboardCard({ title, value, variant = "primary" }) {
  const cardClass = `card card-${variant}`;

  return (
    <div className={cardClass}>
      <p className="card-title">{title}</p>
      <h3 className="card-value">{value}</h3>
    </div>
  );
}