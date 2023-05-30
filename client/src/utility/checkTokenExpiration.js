function isTokenExpired(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const tokenPayload = JSON.parse(window.atob(base64));

  const expirationTimestamp = tokenPayload.exp * 1000; // Convert to milliseconds
  const currentTimestamp = Date.now();

  return currentTimestamp >= expirationTimestamp;
}

export default isTokenExpired;
