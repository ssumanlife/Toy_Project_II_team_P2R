/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './FirebaseConfig.ts';

const createPayrollCorApp = async (name: string, month: number, option: string, correctionDetails: string) => {
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));
    for (const memberDoc of membersSnapshot.docs) {
      const collectionSnapshot = await getDocs(collection(db, `members/${memberDoc.id}/payrollCorApp`));
      for (const payDataDoc of collectionSnapshot.docs) {
        const payData = payDataDoc.data();
        if (payData.name === name) {
          await addDoc(collection(db, `members/${memberDoc.id}/payrollCorApp`), {
            name: payData.name,
            month,
            correctionState: 'standBy',
            correctionDetails,
            reasonForApplication: option,
          });
          break;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export default createPayrollCorApp;
