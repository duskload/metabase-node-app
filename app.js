const express = require("express");
const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

const METABASE_SITE_URL = process.env.METABASE_SITE_URL
const METABASE_SECRET_KEY = process.env.METABASE_SECRET_KEY

console.log('METABASE_SITE_URL', {
  METABASE_SITE_URL,
  METABASE_SECRET_KEY
})

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

function getPayloadObject(query, defaultResource) {
  const { resource, fitness_network_id } = query;
  const payload = {
    resource: { dashboard: Number(resource) || defaultResource },
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  };

  if (fitness_network_id) {
    payload.params = { fitness_network_id: [fitness_network_id] };
  }

  return payload
}

app.use("/iframe", (req, res) => {
  const payload  = getPayloadObject(req.query, 375)

  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true&theme=transparent`;

  res.status(200).send({ iframeUrl });
});

app.use("/first-timers", (req, res) => {
  const payload  = getPayloadObject(req.query, 274)

  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true&theme=transparent`;

  res.status(200).send({ iframeUrl });
});


app.use("/client-engagement", (req, res) => {
  const payload  = getPayloadObject(req.query, 373)
  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true&theme=transparent`;

  res.status(200).send({ iframeUrl });
});

app.use("/fitness-network-summary", (req, res) => {
  const payload  = getPayloadObject(req.query, 314)
  const token = jwt.sign(payload, METABASE_SECRET_KEY);

  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true&theme=transparent`;

  res.status(200).send({ iframeUrl });
});

app.listen(8381, () => {
  console.log("http://localost:8381 is running");
});
