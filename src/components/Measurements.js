import { useSelector } from 'react-redux';

export default function Measurements() {
  const measurements = useSelector(state => state.timer.measurements);

  if (!measurements.length) return (
    <div style={{ marginTop: 40 }}>
      <h3>Keçmiş ölçmələr</h3>
      <div>Yoxdur</div>
    </div>
  );

  return (
    <div style={{ marginTop: 40 }}>
      <h3>Keçmiş ölçmələr</h3>
      <ul className="measurements-list">
        {measurements.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}