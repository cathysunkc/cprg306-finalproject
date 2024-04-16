
import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";


// Retrieve all tracks for a specific user from Firestore
export const getTracks = async (userId) => {
    try {
      const docRef = collection(db, "users", userId, "tracks");
      const docSnap = await getDocs(docRef);
      
      const tracks = [];

      docSnap.forEach((doc) => {
        tracks.push({id: doc.id, ...doc.data() });
      });
      
      return tracks;      
    } 
    catch (error) {
      console.error("Error in getTracks: ", error);
    }
};


  // Add a new track
export const addTrack = async (userId, track) => {
    try {        
      const docRef = await addDoc(collection(db, "users", userId, "tracks"), track);
      return docRef.id;
    } 
    catch (error) {
      console.error("Error in addTrack:", error);
    }
};