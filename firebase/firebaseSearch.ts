import { db } from "./firebaseInit";

import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";  

export const searchTransfers = async (searchField, searchTerm, lastVisible) => {
    const next = query(collection(db, "transfers"), where(searchField, "==", searchTerm), limit(2))
    const documentSnapshots = await getDocs(next);
    return documentSnapshots
}