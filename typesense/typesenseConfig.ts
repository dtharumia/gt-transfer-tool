import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

export const TYPESENSE_SERVER_CONFIG = {
  apiKey: "JejcBtnDlRYKCTvBuhSCpH3jafOBvFh2", // Be sure to use an API key that only allows searches, in production
  nodes: [
    {
      host: "teq6fdvwgrz84jm0p-1.a1.typesense.net",
      port: "443",
      protocol: "https",
    },
  ],
  connectionTimeoutSeconds: 2,
};

export const typesenseAdapter = new TypesenseInstantsearchAdapter({
  server: TYPESENSE_SERVER_CONFIG,
  collectionSpecificSearchParameters: {
    transfers: {
      queryBy: "gt_title, gt_class, transfer_school"
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