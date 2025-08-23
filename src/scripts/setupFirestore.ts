import { setupFirestoreData } from '../utils/firestoreSetup';

// Run the setup
setupFirestoreData()
  .then(() => {
    console.log('Firestore setup completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during Firestore setup:', error);
    process.exit(1);
  }); 