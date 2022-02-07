const { exec } = require("child_process");
require("dotenv").config();

const API_KEY = process.env.TYPESENSE_ADMIN_API_KEY;
const PORT = process.env.TYPESENSE_PORT;
const Typesense = require('typesense')


const command = `docker run -d -p ${PORT}:8108 -v\`pwd\`/typesense-server-data/:/data \
typesense/typesense:0.23.0.rc22 --data-dir /data --api-key=${API_KEY} --listen-port ${PORT}  --enable-cors`;

exec(command, (err, stdout, stderr) => {
  if (!err && !stderr) console.log("Typesense Server is running...");

  if (err) {
    console.log("Error running server: ", err);
  }

  if (stderr) {
    console.log("Error running server: ", stderr);
  }

  if (stdout) {
    console.log("Server output: ", stdout);
  }
});
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
sleep(5000).then(() => {

  let client = new Typesense.Client({
    nodes: [
      {
        host: process.env.TYPESENSE_HOST,
        port: process.env.TYPESENSE_PORT,
        protocol: process.env.TYPESENSE_PROTOCOL,
      },
    ],
    apiKey: process.env.TYPESENSE_ADMIN_API_KEY,
  })

  client.keys().create({
    'description': 'Search-only key.',
    'actions': ['documents:search'],
    'value': '2295421c-65a3-43ca-8ae6-eeb41d3c09cf',
    "collections": ["*"]
  })

})
