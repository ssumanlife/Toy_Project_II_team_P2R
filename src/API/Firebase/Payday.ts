import { collection, getDoc, getDocs, doc, writeBatch } from 'firebase/firestore';
import { db } from './FirebaseConfig.ts';

interface PayDayData {
  payDay: string;
}

const getPayDay = async (userId: string): Promise<PayDayData | null> => {
  try {
    const docRef = doc(db, `members/user${userId}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const payDay = data.payDay ? data.payDay.replace(/[^0-9]/g, '') : null;
      return { payDay } as PayDayData;
    }
    return null;
  } catch (error) {
    console.warn('Error getting document: ', error);
    return null;
  }
};

const updatePayDay = async (payDay: string): Promise<void> => {
  try {
    const membersCollectionRef = collection(db, 'members');
    const snapshot = await getDocs(membersCollectionRef);

    if (snapshot.empty) {
      console.warn('No documents found in the members collection');
      return;
    }

    const batch = writeBatch(db);
    let batchCounter = 0;

    snapshot.forEach((docSnapshot) => {
      const docRef = doc(db, 'members', docSnapshot.id);
      batch.update(docRef, { payDay: `${payDay}일` });

      batchCounter += 1;

      if (batchCounter === 500) {
        batch.commit();
        batchCounter = 0;
      }
    });

    if (batchCounter > 0) {
      await batch.commit();
    }

    console.log('All documents updated successfully');
  } catch (error) {
    console.warn('Error updating documents: ', error);
  }
};

export { getPayDay, updatePayDay };
