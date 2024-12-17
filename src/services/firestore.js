import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getSearchResults(searchTerm) {
  const docRef = doc(db, "searchResults", searchTerm);
  const docSnap = await getDoc(docRef);
  console.log(docSnap);
  console.log({ db });

  if (docSnap.exists()) {
    return docSnap.data().results;
  } else {
    return null;
  }
}

export async function saveSearchResults(searchTerm, results) {
  const docRef = doc(db, "searchResults", searchTerm);
  await setDoc(docRef, { results });
}
