const jwt = require('jsonwebtoken');

// This is you subscriber JWT key defined in Stackhero's console
const subscriberJwtKey = '<your subscriber JWT key>';

// Generating the JWS
// We set subscribe to "*" but you can replace it by a list of topics allowed for the subscriber
const jws = jwt.sign(
  { mercure: { subscribe: [ '*' ] } },
  subscriberJwtKey,
  { expiresIn: 24 * 60 * 60 } // Expiration in 24 hours
);

console.log('Here is the generated JWS token:');
console.log(jws);