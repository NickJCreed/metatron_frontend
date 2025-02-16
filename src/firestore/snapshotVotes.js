import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

// Add a new vote
export async function addVote(snapshotId, userId, vote) {
    const votesRef = collection(db, "votes");
    await addDoc(votesRef, {
        snapshotId,
        userId,
        vote,
        timestamp: new Date(),
    });
}

// Fetch all votes for a snapshot
export async function getVotes(snapshotId) {
    const votesRef = collection(db, "votes");
    const querySnapshot = await getDocs(votesRef);
    const votes = [];
    querySnapshot.forEach((doc) => {
        if (doc.data().snapshotId === snapshotId) {
            votes.push(doc.data());
        }
    });
    return votes;
}
