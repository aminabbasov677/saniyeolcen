import { useSelector } from 'react-redux';

export default function MeasurementsDisplay({ type }) {
  const clockMeasurements = useSelector(state => state.clock.measurements);
  const timerMeasurements = useSelector(state => state.timer.measurements);
  const laps = useSelector(state => state.stopwatch.laps);

  let title = '';
  let data = [];

  if (type === 'clock') {
    title = 'Keçmiş Saatlar';
    data = clockMeasurements;
  } else if (type === 'timer') {
    title = 'Keçmiş Taymerlər';
    data = timerMeasurements;
  } else if (type === 'stopwatch') {
    title = 'Dairələr';
    data = laps;
  } else {
    return null;
  }


  if (data.length === 0) return (
    <div style={{ marginTop: 40 }}>
      <h3>{title}</h3>
      <div>Yoxdur</div>
    </div>
  );

  return (
    <div style={{ marginTop: 40 }}>
      <h3>{title}</h3>
      <ul className="measurements-list">
        {data.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}