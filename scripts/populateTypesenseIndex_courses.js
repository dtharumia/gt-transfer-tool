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


  const courseSchema = {
    name: "courses",
    num_documents: 0,
    fields: [
      {
        name: "number",
        type: "string",
        facet: false,
      },
      {
        name: "course",
        type: "string",
        facet: false,
      }
    ]
  };


  const courses = require("./data/gt-courses.json");

  try {
    const collection = await typesense.collections("courses").retrieve();
    console.log("Found existing collection of courses");
    console.log(JSON.stringify(collection, null, 2));

    if (collection.num_documents !== courses.length) {
      console.log("Collection has different number of documents than data");
      console.log("Deleting collection");
      await typesense.collections("courses").delete();
    }
  } catch (err) {
    console.error(err);
  }

  console.log("Creating schema...");
  console.log(JSON.stringify(courseSchema, null, 2));

  await typesense.collections().create(courseSchema);

  console.log("Populating collection...");

  try {
    const returnData = await typesense
      .collections("courses")
      .documents()
      .import(courses);

    console.log("Return data: ", returnData);
  } catch (err) {
    console.error(err);
  }
})();