const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 8585;
// TODO: Read token from environment variable
const authorizationToken = "";

app.use(express.json());
app.use(cors());

app.post("/generateAuthToken", (req, res) => {
  // Extract the backend and user from the request
  const { backend, user } = req.body;

  // Call the Glean server's createauthtoken endpoint
  axios({
    method: "post",
    url: `${backend}/createauthtoken`,
    headers: {
      Authorization: `Bearer ${authorizationToken}`,
      "X-Scio-Actas": user,
    },
  })
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    });
});

app.post("/generateAnonymousAuthToken", (req, res) => {
  // Extract the backend and user from the request
  const { backend, user } = req.body;

  // Call the Glean server's createanonymoustoken endpoint
  axios({
    method: "post",
    url: `${backend}/api/v1/createanonymoustoken`,
    headers: {
      Authorization: `Bearer ${authorizationToken}`,
      "X-Scio-Actas": user,
    },
  })
    .then((response) => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
