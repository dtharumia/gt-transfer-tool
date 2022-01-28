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

  const schema = {
    name: "transfers",
    num_documents: 0,
    fields: [
      {
        name: "gt_number",
        type: "string",
        facet: false,
      },
      {
        name: "state",
        type: "string",
        facet: false,
      },
      {
        name: "term",
        type: "string",
        facet: true,
      },
      {
        name: "transfer_school",
        type: "string",
        facet: false,
      },
      {
        name: "transfer_number",
        type: "string",
        facet: true,
      },
      {
        name: "transfer_course",
        type: "string",
        facet: true,
      },
      {
        name: "transfer_level",
        type: "string",
        facet: true,
      },
      {
        name: "transfer_mingrade",
        type: "string",
        facet: true,
      },
      {
        name: "gt_course",
        type: "string",
        facet: false,
      },
      {
        name: "gt_credit",
        type: "string",
        facet: true,
      },
    ]
  };

  const transfers = require("./data/transfer-courses.json");

  try {
    const collection = await typesense.collections("transfers").retrieve();
    console.log("Found existing collection of movies");
    console.log(JSON.stringify(collection, null, 2));

    if (collection.num_documents !== transfers.length) {
      console.log("Collection has different number of documents than data");
      console.log("Deleting collection");
      await typesense.collections("transfers").delete();
    }
  } catch (err) {
    console.error(err);
  }

  console.log("Creating schema...");
  console.log(JSON.stringify(schema, null, 2));

  await typesense.collections().create(schema);

  console.log("Populating collection...");

  try {
    const returnData = await typesense
      .collections("transfers")
      .documents()
      .import(transfers);

    console.log("Return data: ", returnData);
  } catch (err) {
    console.error(err);
  }
})();