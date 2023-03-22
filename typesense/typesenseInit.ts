import Typesense from 'typesense'

export const client = new Typesense.Client({
  'nodes': [{
    "host": "teq6fdvwgrz84jm0p-1.a1.typesense.net",
    "port": "443",
    "protocol": "https",
  }],
  'apiKey': "JejcBtnDlRYKCTvBuhSCpH3jafOBvFh2",
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





    
