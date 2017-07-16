const jwt = require("express-jwt");
const jwks = require("jwks-rsa");

/**
 * Auth middleware
 */
module.exports = function(app, config) {
  // Middleware for auth
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    aud: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: "RS256"
  });

  /**
   * API Routes
   */

  // GET API Root
  app.get("/", (req, res) => {
    res.send("API works");
  });
};
