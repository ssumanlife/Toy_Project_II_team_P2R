import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from './FirebaseConfig.ts';

const deleteSalaryCorrectionAPI = async (name: string, month: number, correctionDetails: string) => {
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));
    const deletePromises = membersSnapshot.docs.map(async (memberDoc) => {
      const q = query(
        collection(db, 'members', memberDoc.id, 'payrollCorApp'),
        where('name', '==', name),
        where('month', '==', month),
        where('correctionDetails', '==', correctionDetails),
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(async (docSnapshot) => {
        deleteDoc(doc(db, 'members', memberDoc.id, 'payrollCorApp', docSnapshot.id));
      });
    });
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting salary correction:', error);
  }
};

export default deleteSalaryCorrectionAPI;
