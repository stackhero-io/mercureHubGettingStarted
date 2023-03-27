// This is a simple example of a Mercure-Hub client in Node.js.
// This is not usual to connect from Node.js and you shouldn't probably using this code but use the example in "frontend" which will show you how to connect from a browser.
const EventSource = require('eventsource');

const endpoint = '<XXXXXX>.stackhero-network.com'; // PUT YOUR SERVER URL

// Caution: this is not your subscriber JWT defined in Stackhero's console.
// To get you subscriber JWS (with a final S, not T like in JWT), you have to generate it on the server side.
// An example is available in the `backend/subscriberJwsGenerator.js`
const subscriberJws = ''; // PUT YOUR SUBSCRIBER JWS


const url = new URL('https://' + endpoint + '/.well-known/mercure');

// Add topic to listen to
url.searchParams.append('topic', `https://${endpoint}` + '/books/1');

const eventSource = new EventSource(
  url.toString(),
  {
    headers: {
      Authorization: `Bearer ${subscriberJws}`
    }
  }
);

eventSource.onmessage = e => console.log(e);
