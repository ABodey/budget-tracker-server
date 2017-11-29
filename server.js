const http = require('http');
const app = require('./lib/app');
const port = process.env.PORT || 3001;
require('./lib/mongoose');

const server = http.createServer(app);

server.listen(port, () => {
    // eslint-disable-next-line
  console.log('budget-track.com\'s server is running on', server.address().port);
});