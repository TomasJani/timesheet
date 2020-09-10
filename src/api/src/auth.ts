import * as jwt from "express-jwt";
import * as jwksRsa from "jwks-rsa";


const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://tomasjanicek.eu.auth0.com/.well-known/jwks.json`
    }),
    audience: 'https://timesheet/api',
    issuer: `https://tomasjanicek.eu.auth0.com/`,
    algorithms: ['RS256']
});

export default checkJwt;