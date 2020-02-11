require('dotenv').config()
const jwt = require('jsonwebtoken');
const request = require('request-promise-native');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

if (!process.env.MERCURE_PUBLISHER_JWT_KEY) {
  throw Error('You should first fill the .env-example file and the rename it to .env');
}

console.log('You should open the file subscriber.html to see the datas being dispatched.');

const endpoint = process.env.MERCURE_SERVER;
const publisherJwtKey = process.env.MERCURE_PUBLISHER_JWT_KEY;

(async () => {
  while (true) {
    // Defining the topic where we want to dispatch the new data
    const topic = `https://${endpoint}` + '/books/1';

    // Defining a random stock count and prepare the data
    const stockCount = Math.floor(Math.random() * (100 - 1) + 1);
    const data = { topic, stockCount, available: true };


    // Generating the bearer (JWT)
    const bearer = jwt.sign(
      { mercure: { publish: [ topic ] } },
      publisherJwtKey,
      {
        expiresIn: 60, // Bearer expiring in one minute
        noTimestamp: true // Do not add "issued at" information to avoid error "Token used before issued"
      }
    );


    // Sending the datas to Mercure Hub that will dispatch them to clients
    console.log(`Sending datas: ${JSON.stringify(data)}`);
    await request.post(
      {
        url: `https://${endpoint}/.well-known/mercure`,
        auth: { bearer },
        form: { topic, data: JSON.stringify(data) },
        agentOptions: { rejectUnauthorized: false } // Just for debug, should always be set to true or commented!
      }
    );

    await delay(1000);
  }
})().catch(error => {
  console.error('');
  console.error('🐞 An error occurred!');
  console.error(error);
  process.exit(1);
});