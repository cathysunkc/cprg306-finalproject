
import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";


// Retrieve all artists for a specific user from Firestore
export const getArtists = async (userId) => {
    try {
      const docRef = collection(db, "userId", userId, "artists");
      const docSnap = await getDocs(docRef);
      
      const artists = [];

      docSnap.forEach((doc) => {
        artists.push({id: doc.id, ...doc.data() });
      });
     
      return artists;      
    } 
    catch (error) {
      console.error("Error in getArtists: ", error);
    }
};


  // Add a new artist
export const addArtist = async (userId, artist) => {
    try {        
      const docRef = await addDoc(collection(db, "users", userId, "artists"), artist);
      return docRef.id;
    } 
    catch (error) {
      console.error("Error in addArtist:", error);
    }
};