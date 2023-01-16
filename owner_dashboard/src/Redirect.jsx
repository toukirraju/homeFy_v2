export default function Redirect(params) {
  window.location.replace(params.destination);

  return <div />;
}
