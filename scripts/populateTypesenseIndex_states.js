require("dotenv").config();

const Typesense = require("typesense");

module.exports = (async () => {
  const TYPESENSE_CONFIG = {
    nodes: [
      {
        host: process.env.TYPESENSE_HOST,
        port: process.env.TYPESENSE_PORT,
        protocol: process.env.TYPESENSE_PROTOCOL,
      },
    ],
    apiKey: process.env.TYPESENSE_ADMIN_API_KEY,
  };

  console.log("Config: ", TYPESENSE_CONFIG);

  const typesense = new Typesense.Client(TYPESENSE_CONFIG);


  const stateSchema = {
    name: "states",
    num_documents: 0,
    fields: [
      {
        name: "name",
        type: "string",
        facet: false,
      },
      {
        name: "abbreviation",
        type: "string",
        facet: false,
      }
    ]
  };


  const states = require("./data/states.json");

  try {
    const collection = await typesense.collections("states").retrieve();
    console.log("Found existing collection of states");
    console.log(JSON.stringify(collection, null, 2));

    if (collection.num_documents !== states.length) {
      console.log("Collection has different number of documents than data");
      console.log("Deleting collection");
      await typesense.collections("states").delete();
    }
  } catch (err) {
    console.error(err);
  }

  console.log("Creating schema...");
  console.log(JSON.stringify(stateSchema, null, 2));

  await typesense.collections().create(stateSchema);

  console.log("Populating collection...");

  try {
    const returnData = await typesense
      .collections("states")
      .documents()
      .import(states);

    console.log("Return data: ", returnData);
  } catch (err) {
    console.error(err);
  }
})();