// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';
import dataUser from './data.json'; // Import the JSON data to be added to Firestore
import firebaseConfig from './serviceAccountKey';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a Firestore database reference
const db = getFirestore(firebaseApp);

// Function to create data in Firestore
const createDataInFirestore = async (data = dataUser) => {
    try {
        // Loop through each collection in the JSON dataUser object
        for (const collectionName in data.dataUser) {
            console.log(`Creating collection '${collectionName}'...`);
            // Get the collection reference
            const collectionRef = collection(db, collectionName);

            // Loop through each document in the collection
            for (const docId in data.dataUser[collectionName]) {
                console.log(`Adding document '${docId}' to collection '${collectionName}'...`);
                // Add the document to the collection
                await setDoc(doc(collectionRef, docId), data.dataUser[collectionName][docId]);
            }

            console.log(`Collection '${collectionName}' created with documents.`);
        }

        console.log('Data creation complete.');
    } catch (error) {
        console.error('Error creating data:', error);
    }
};

// Export the function to use in other files
export default createDataInFirestore;
