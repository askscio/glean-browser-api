const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 8585;

app.use(express.json());
app.use(cors());

app.post("/generateAuthToken", (req, res) => {
  // Extract the backend and user from the request
  const { backend, actAs, apiKey } = req.body;

  // Call the Glean server's createauthtoken endpoint
  axios({
    method: "POST",
    url: `${backend}/rest/api/v1/createauthtoken`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "X-Scio-Actas": actAs,
      accept: "application/json",
    },
  })
    .then((response) => res.json(response.data))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.post("/generateAnonymousAuthToken", (req, res) => {
  // Extract the backend and user from the request
  const { backend, actAs } = req.body;

  // Call the Glean server's createanonymoustoken endpoint
  axios({
    method: "post",
    url: `${backend}/api/v1/createanonymoustoken`,
  })
    .then((response) => res.json(response.data))
    .catch((error) => res.status(500).json({ error: error.message }));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
