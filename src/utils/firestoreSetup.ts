import { db } from '@/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

export const setupFirestoreData = async () => {
  try {
    // Add startups
    const startupsData = {
      "startup1": {
        "name": "Tech Innovators",
        "location": "San Francisco, CA",
        "fundingStage": "Series A",
        "description": "AI-powered solutions for enterprise",
        "headquarters": "Silicon Valley",
        "industry": "Artificial Intelligence",
        "imageUrl": "https://example.com/startup1.jpg"
      },
      "startup2": {
        "name": "Green Energy Solutions",
        "location": "Austin, TX",
        "fundingStage": "Seed",
        "description": "Renewable energy technology",
        "headquarters": "Austin",
        "industry": "Clean Energy",
        "imageUrl": "https://example.com/startup2.jpg"
      }
    };

    // Add investors
    const investorsData = {
      "investor1": {
        "name": "Growth Capital Ventures",
        "location": "New York, NY",
        "investmentStage": "Series A, Series B",
        "fundType": "Venture Capital",
        "headquarters": "Manhattan",
        "imageUrl": "https://example.com/investor1.jpg"
      },
      "investor2": {
        "name": "Tech Seed Fund",
        "location": "Boston, MA",
        "investmentStage": "Seed, Pre-Seed",
        "fundType": "Early Stage VC",
        "headquarters": "Boston",
        "imageUrl": "https://example.com/investor2.jpg"
      }
    };

    // Add startups to Firestore
    for (const [id, data] of Object.entries(startupsData)) {
      await setDoc(doc(db, 'startups', id), data);
    }

    // Add investors to Firestore
    for (const [id, data] of Object.entries(investorsData)) {
      await setDoc(doc(db, 'investors', id), data);
    }

    console.log('Sample data has been added to Firestore');
  } catch (error) {
    console.error('Error setting up Firestore data:', error);
  }
}; 