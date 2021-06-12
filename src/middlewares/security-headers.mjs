export default function securityHeaders(req, res, next) {
  // If in development, just set 'self' for simplicity, but in production specify origin and port
  res.set('Content-Security-Policy', process.env.NODE_ENV === 'production' ? 'default-src https://blodenog.rpovlsen.com:443' : 'default-src self');
  next();
}
