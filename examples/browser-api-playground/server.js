const express = require('express');
const axios = require('axios');

const app = express();
const port = 8585;
// TODO: Read token from environment variable
const authorizationToken = '';
const actAs = 'steve.smith@salessavvy.net';

app.use(express.json());

app.post('/generateAuthToken', (req, res) => {
  // Extract the clientVersion and domain from the request
  const { backend } = req.body;

  // Call the Glean server's createauthtoken endpoint
  axios({
    method: 'post',
    url: `${backend}/createauthtoken`,
    params: { clientVersion, domain },
    headers: {
      'Authorization': `Bearer ${authorizationToken}`,
      'X-Scio-Actas': actAs
    }
  })
  .then(response => res.json(response.data))
  .catch(error => res.status(500).json({ error: error.message }));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
