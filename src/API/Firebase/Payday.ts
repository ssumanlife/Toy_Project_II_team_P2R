import { doc, getDoc, updateDoc } from 'firebase/firestore';
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

const updatePayDay = async (userId: string, payDay: string): Promise<void> => {
  try {
    const docRef = doc(db, `members/user${userId}`);
    await updateDoc(docRef, { payDay: `${payDay}일` });
  } catch (error) {
    console.warn('Error updating document: ', error);
  }
};

export { getPayDay, updatePayDay };
