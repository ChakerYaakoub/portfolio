// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import firebaseConfig from './serviceAccountKey.json'; // Import your Firebase configuration file
import dataUser from './data.json'; // Import the JSON data to be added to Firestore

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a Firestore database reference
const db = getFirestore(firebaseApp);

// Function to create data in Firestore
const createDataInFirestore = async (data = dataUser) => {
    try {
        // Loop through each collection in the JSON data
        for (const collectionName in data) {
            // Get the collection reference
            const collectionRef = collection(db, collectionName);

            // Check if the collection exists
            const collectionSnapshot = await getDocs(collectionRef);

            // If the collection doesn't exist, create it
            if (collectionSnapshot.empty) {
                // Loop through each document in the collection
                for (const docId in data[collectionName]) {
                    // Add the document to the collection
                    await setDoc(doc(collectionRef, docId), data[collectionName][docId]);
                }
                console.log(`Collection '${collectionName}' created with documents.`);
            } else {
                console.log(`Collection '${collectionName}' already exists.`);
            }
        }
        console.log('Data creation complete.');
    } catch (error) {
        console.error('Error creating data:', error);
    }
};

// Export the function to use in other files
export default createDataInFirestore;
