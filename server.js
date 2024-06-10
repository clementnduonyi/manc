const express = require('express');
const bodyParser = require('body-parser');
const sendMessage = require('./api/send-message');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));



//API endpoint
app.post('/api/send-message', sendMessage);

// Fallback to serve index.html for any other requests (for SPA)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
