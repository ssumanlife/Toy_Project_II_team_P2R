import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './Firebase_Config.tsx';

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
    console.log('No such document!');
    return null;
  } catch (error) {
    console.error('Error getting document: ', error);
    return null;
  }
};

const updatePayDay = async (userId: string, payDay: string): Promise<void> => {
  try {
    const docRef = doc(db, `members/user${userId}`);
    await updateDoc(docRef, { payDay: `${payDay}일` });
    console.log('Document successfully updated!');
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export { getPayDay, updatePayDay };
