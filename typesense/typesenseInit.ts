import Typesense from 'typesense'

const client = new Typesense.Client({
  'nodes': [{
    'host': process.env.TYPESENSE_HOST, // where xxx is the ClusterID of your Typesense Cloud cluster
    'port': process.env.TYPESENSE_PORT,
    'protocol': 'https'
  }],
  'apiKey': process.env.TYPESENSE_ADMIN_API_KEY,
  'connectionTimeoutSeconds': 2
})


export const createCollection = (collection) => {
    client.collections().create(collection).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
}
export const importDocuments = (collection, documents) => {
 
    client.collections(collection).documents().import(documents, { action: 'upsert' }).then(
        (response) => {
            console.log(response)
        }
    ).catch((error) => {
        console.log(error)
    }
    )
}
const test = () => {
    console.log("test")
}

export default test





    
