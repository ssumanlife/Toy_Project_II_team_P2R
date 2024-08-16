import { collectionGroup, getDocs, query, where } from 'firebase/firestore';
import { db } from './FirebaseConfig.ts';

const getStandByNames = async (): Promise<string[]> => {
  try {
    const q = query(collectionGroup(db, 'payrollCorApp'), where('correctionState', '==', 'standBy'));

    const querySnapshot = await getDocs(q);
    const nameSet = new Set<string>();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const { name } = data;
      if (name) {
        nameSet.add(name);
      }
    });

    return Array.from(nameSet);
  } catch (error) {
    console.error('Error getting documents: ', error);
    return [];
  }
};

export default getStandByNames;
