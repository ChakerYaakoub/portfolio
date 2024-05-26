// dataCreate.js

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const dataUser = require('./data.json');


// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Create a Firestore database reference
const db = admin.firestore();

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
module.exports = createDataInFirestore;
