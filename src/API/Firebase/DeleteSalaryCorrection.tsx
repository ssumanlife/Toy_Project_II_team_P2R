/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from './Firebase_Config.tsx';

const deleteSalaryCorrectionAPI = async (name: string, month: number, correctionDetails: string) => {
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));
    for (const memberDoc of membersSnapshot.docs) {
      const collectionSnapshot = await getDocs(collection(db, `members/${memberDoc.id}/payrollCorApp`));
      for (const payDataDoc of collectionSnapshot.docs) {
        const payData = payDataDoc.data();
        if (payData.name === name && payData.month === month && payData.correctionDetails === correctionDetails) {
          await deleteDoc(doc(db, `members/${memberDoc.id}/payrollCorApp`, payDataDoc.id));
          break;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export default deleteSalaryCorrectionAPI;
