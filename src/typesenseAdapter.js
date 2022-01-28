import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

let TYPESENSE_SERVER_CONFIG = {
  apiKey: process.env.REACT_APP_TYPESENSE_SEARCH_ONLY_API_KEY, // Be sure to use an API key that only allows searches, in production
  nodes: [
    {
      host: process.env.REACT_APP_TYPESENSE_HOST,
      port: process.env.REACT_APP_TYPESENSE_PORT,
      protocol: process.env.REACT_APP_TYPESENSE_PROTOCOL,
    },
  ],
  connectionTimeoutSeconds: 1,
  numRetries: 8,
};

export const typesenseAdapter = new TypesenseInstantsearchAdapter({
  server: TYPESENSE_SERVER_CONFIG,
  additionalSearchParameters: {
    numTypos: 3,
    typoTokensThreshold: 1,
  },
  collectionSpecificSearchParameters:{
    // transfers: {
    //   queryBy: "gt_number,gt_course",
    // },
    schools: {
      queryBy: "school, state"
    },
    courses: {
      queryBy:"number"
    }
  }
});

export const searchClient = typesenseAdapter.searchClient;