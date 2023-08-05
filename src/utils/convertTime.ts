const getExpiresInSeconds = expireTime => {
  const expirationDate = new Date(expireTime);
  const now = new Date();
  const expiresInSeconds = (expirationDate - now) / 1000;
  return expiresInSeconds;
};

export const checkAccessTokenValid = (accToken, expireTime) => {
  const expiresInSeconds = getExpiresInSeconds(expireTime);
  const now = Date.now() / 1000;
  const expirationTime = now + expiresInSeconds;
  return expirationTime > now;
};
