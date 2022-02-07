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
    typesense.collections("searches").delete()

    const searchSchema = {
        name: "searches",
        num_documents: 0,
        fields: [
            {
                name: "type",
                type: "string",
                facet: true
            },
            {
                name: "primary",
                type: "string",
                facet: false,
            },
            {
                name: "secondary",
                type: "string",
                facet: false,
            },

        ]
    };


    const searches = require("./data/search.json");

    try {
        const collection = await typesense.collections("searches").retrieve();
        console.log("Found existing collection of searches");
        console.log(JSON.stringify(collection, null, 2));

        if (collection.num_documents !== searches.length) {
            console.log("Collection has different number of documents than data");
            console.log("Deleting collection");
            await typesense.collections("searches").delete();
        }
    } catch (err) {
        console.error(err);
    }

    console.log("Creating schema...");
    console.log(JSON.stringify(searchSchema, null, 2));

    await typesense.collections().create(searchSchema);

    console.log("Populating collection...");

    try {
        const returnData = await typesense
            .collections("searches")
            .documents()
            .import(searches);

        console.log("Return data: ", returnData);
    } catch (err) {
        console.error(err);
    }
})();
