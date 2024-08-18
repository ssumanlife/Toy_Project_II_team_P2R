import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './FirebaseConfig.ts';

const updateCorrectionState = async (name: string, month: number, state: string, correctionDetails: string) => {
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));
    const payrollCorAppUpdatePromise = membersSnapshot.docs.map(async (memberDoc) => {
      const q = query(
        collection(db, 'members', memberDoc.id, 'payrollCorApp'),
        where('name', '==', name),
        where('month', '==', month),
        where('correctionDetails', '==', correctionDetails),
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(async (docSnapshot) => {
        setDoc(doc(db, 'members', memberDoc.id, 'payrollCorApp', docSnapshot.id), {
          ...docSnapshot.data(),
          correctionState: state,
        });
      });
    });
    await Promise.all(payrollCorAppUpdatePromise);
  } catch (error) {
    console.error('Error updating correction state:', error);
  }
};

export default updateCorrectionState;
