import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import * as Typesense from "typesense";

export const TYPESENSE_SERVER_CONFIG = {
  apiKey: process.env.TYPESENSE_SEARCH_API_KEY!, // Be sure to use an API key that only allows searches, in production
  nodes: [
    {
      host: process.env.TYPESENSE_HOST!,
      port: +process.env.TYPESENSE_PORT!,
      protocol: process.env.TYPESENSE_PROTOCOL!,
    },
  ],
  connectionTimeoutSeconds: 2,
};

export const client = new Typesense.Client(TYPESENSE_SERVER_CONFIG);

export const typesenseAdapter = new TypesenseInstantsearchAdapter({
  server: TYPESENSE_SERVER_CONFIG,
  collectionSpecificSearchParameters: {
    transfers: {
      query_by: "gt_title, gt_class, transfer_school",
    },
    searches: {
      query_by: "primary, secondary",
      per_page: 5,
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
          hitsPerPage: 0,
          exhaustiveNbHits: false,
          query: '',
          params: '',
        })),
      });
    }

    return typesenseAdapter.searchClient.search(requests);
  },
};