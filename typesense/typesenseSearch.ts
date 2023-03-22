import { client } from "./typesenseSearchConfig";

export const searchTypesense = async (collection, q, query_by, page, sort_by) => {
    const searchParameters = {
        'q': q,
        'query_by': query_by,
        'page': page,
        'sort_by': sort_by,
        'filter_by': query_by + ":" + q,
        'per_page': 20,
    }

    const results = client.collections(collection).documents().search(searchParameters)

    return results
}