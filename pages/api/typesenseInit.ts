import { createCollection, importDocuments } from "@/typesense/typesenseInit";
const handler = (req, res) => {

    const transfersCollection = {
    'name': 'transfers',
    'fields': [
        { 'name': 'id', 'type': 'string' },
        { 'name': 'gt_ch', 'type': 'string' },
        { 'name': 'gt_class', 'type': 'string' },
        { 'name': 'gt_title', 'type': 'string' },
        { 'name': 'state', 'type': 'string' },
        { 'name': 'transfer_class', 'type': 'string' },
        { 'name': 'transfer_level', 'type': 'string' },
        { 'name': 'transfer_mingrade', 'type': 'string' },
        { 'name': 'transfer_school', 'type': 'string' },
        { 'name': 'transfer_title', 'type': 'string' },
        { 'name': 'term', 'type': 'string' },
        ]
    }

    // const transferDocuments = getTransferDocuments();

    createCollection(transfersCollection)
    // importDocuments("transfers", transferDocuments)

    res.end("Typesense initialized and documents imported.")

}

export default handler;
