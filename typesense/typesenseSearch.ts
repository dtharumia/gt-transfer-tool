import { client } from "./typesenseInit";

export const searchTransfers = async (q, query_by, page, sort_by) => {

    const searchParameters = {
        'q': q,
        'query_by': query_by,
        'page': page,
        'sort_by': sort_by,
        'filter_by': query_by + ":" + q
    }

    const results = client.collections('transfers').documents().search(searchParameters)

    return results
}

