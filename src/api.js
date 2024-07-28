import { db } from "../firebase.config";
import { doc, setDoc, getDoc } from 'firebase/firestore'

export async function updatePersonalData(uid, data) {
    try {
        const userDocRef = doc(db, 'users', uid);
        await setDoc(userDocRef, data, { merge: true });

        console.log('User data updated successfully');
    } catch (error) {
        console.error('Error updating user data:', error);
    }
}

export async function getPersonalData(uid) {
    try {
        const userDocRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error getting user data:', error);
        throw error;
    }
}

