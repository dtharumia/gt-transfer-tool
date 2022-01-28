import Typesense from 'typesense'

let client = new Typesense.Client({
    'nodes': [{
        'host': 'http://localhost', // where xxx is the ClusterID of your Typesense Cloud cluster
        'port': '8108',
        'protocol': 'https'
    }],
    'apiKey': 'xyz',
    'connectionTimeoutSeconds': 2
})

const myCollection = {
    'name': 'books',
    'fields': [
        { 'name': 'id', 'type': 'string' },
        { 'name': 'title', 'type': 'string' },
        { 'name': 'publication_year', 'type': 'int32' },
    ],
    'default_sorting_field': 'publication_year'
}

client.collections().create(myCollection)

exports.onBookCreate = functions.firestore.document('/books/{bookID}')
    .onCreate((snapshot, context) => {
        // Grab the document id as id value.
        id = context.params.bookID
        const { title, publication_year } = snapshot.data();
        document = { id, title, publication_year }

        // Index the document in books collection  
        return client.collections('books').documents().create(document)
    })

let search = {
    'q': '<SEARCH_VALUE>',
    'query_by': 'title',
}

client.collections('<COLLECTION_NAME>')
    .documents()
    .search(search)
    .then(function (searchResults) {
        console.log(searchResults)
    })
