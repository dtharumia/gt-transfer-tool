import { Hits, InstantSearch, SearchBox } from "react-instantsearch-dom";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";


const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    nodes: [
      {
        host: process.env.TYPESENSE_HOST, // where xxx is the ClusterID of your Typesense Cloud cluster
        port: process.env.TYPESENSE_PORT,
        protocol: "https",
      },
    ],
    apiKey: process.env.TYPESENSE_SEARCH_API_KEY,
    connectionTimeoutSeconds: 2,
  },
  additionalSearchParameters: {
    query_by: "gt_class, gt_title, transfer_school",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const Search = () => (
  <InstantSearch indexName="transfers" searchClient={searchClient}>
    <SearchBox />
    <Hits />
  </InstantSearch>
);

export default Search;
