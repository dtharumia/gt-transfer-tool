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


  const schoolSchema = {
    name: "schools",
    num_documents: 0,
    fields: [
      {
        name: "school",
        type: "string",
        facet: false,
      },
      {
        name: "state",
        type: "string",
        facet: false,
      }
    ]
  };


  const schools = require("./data/transfer-schools.json");

  try {
    const collection = await typesense.collections("schools").retrieve();
    console.log("Found existing collection of schools");
    console.log(JSON.stringify(collection, null, 2));

    if (collection.num_documents !== schools.length) {
      console.log("Collection has different number of documents than data");
      console.log("Deleting collection");
      await typesense.collections("schools").delete();
    }
  } catch (err) {
    console.error(err);
  }

  console.log("Creating schema...");
  console.log(JSON.stringify(schoolSchema, null, 2));

  await typesense.collections().create(schoolSchema);

  console.log("Populating collection...");

  try {
    const returnData = await typesense
      .collections("schools")
      .documents()
      .import(schools);

    console.log("Return data: ", returnData);
  } catch (err) {
    console.error(err);
  }
})();