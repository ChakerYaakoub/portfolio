// dataCreate.js

import { initializeApp, credential as _credential, firestore } from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';
import dataUser from './data.json';


// Initialize Firebase Admin SDK
initializeApp({
    credential: _credential.cert(serviceAccount),
});

// Create a Firestore database reference
const db = firestore();

// Function to create data in Firestore
const createDataInFirestore = async (data = dataUser) => {
    try {
        // Loop through each collection in the JSON data
        for (const collectionName in data) {
            // Get the collection reference
            const collectionRef = db.collection(collectionName);

            // Check if the collection exists
            const collectionSnapshot = await collectionRef.get();

            // If the collection doesn't exist, create it
            if (collectionSnapshot.empty) {
                // Loop through each document in the collection
                for (const docId in data[collectionName]) {
                    // Add the document to the collection
                    await collectionRef.doc(docId).set(data[collectionName][docId]);
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
