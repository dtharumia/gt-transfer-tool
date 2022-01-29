import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

export const TYPESENSE_SERVER_CONFIG = {
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
  collectionSpecificSearchParameters: {
    searches: {
      queryBy: "primary,secondary"
    }
  },
});

export const searchClient = {
  ...typesenseAdapter.searchClient,
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          page: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return typesenseAdapter.searchClient.search(requests);
  },
};