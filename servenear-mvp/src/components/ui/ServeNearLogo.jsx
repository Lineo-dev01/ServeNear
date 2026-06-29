export default function ServeNearLogo({ size = "large" }) {
  return (
    <div className={`servenear-logo servenear-logo-${size}`}>
      <h1>ServeNear</h1>
      <p>Your neighbourhood, at your service</p>
    </div>
  );
}