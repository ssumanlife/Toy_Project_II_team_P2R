import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from './Firebase_Config.tsx';

const deleteSalaryCorrectionAPI = async (name: string, month: number, correctionDetails: string) => {
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));

    const memberDeletionPromises = membersSnapshot.docs.map(async (memberDoc) => {
      const collectionSnapshot = await getDocs(collection(db, `members/${memberDoc.id}/payrollCorApp`));

      const payDataDocs = collectionSnapshot.docs.filter((payDataDoc) => {
        const payData = payDataDoc.data();
        return payData.name === name && payData.month === month && payData.correctionDetails === correctionDetails;
      });

      const deletePromises = payDataDocs.map((payDataDoc) =>
        deleteDoc(doc(db, `members/${memberDoc.id}/payrollCorApp`, payDataDoc.id)),
      );

      await Promise.all(deletePromises);
    });

    await Promise.all(memberDeletionPromises);
  } catch (error) {
    console.error('Error deleting salary correction:', error);
  }
};

export default deleteSalaryCorrectionAPI;
