export default function securityHeaders(req, res, next) {
  // If in development, just set 'self' for simplicity,
  // but in production specify origin, to ensure https
  res.set('Content-Security-Policy', (process.env.NODE_ENV === 'production' ? 'default-src https://blodenog.rpovlsen.com:443' : 'default-src \'self\'') + '; img-src https:;');
  res.set('Strict-Transport-Security', 'Strict-Transport-Security: max-age=31536000; includeSubDomains');
  res.set('X-Frame-Options', 'SAMEORIGIN');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Referrer-Policy', 'no-referrer');
  res.set('Permissions-Policy', 'accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=(), clipboard-read=(), clipboard-write=(), gamepad=(), speaker-selection=(), conversion-measurement=(), focus-without-user-activation=(), hid=(), idle-detection=(), serial=(), sync-script=(), trust-token-redemption=(), vertical-scroll=()');
  next();
}
