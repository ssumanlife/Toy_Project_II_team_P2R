/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from './Firebase_Config.tsx';

const updateCorrectionState = async (name: string, month: number, state: string, correctionDetails: string) => {
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));
    for (const memberDoc of membersSnapshot.docs) {
      const collectionSnapshot = await getDocs(collection(db, `members/${memberDoc.id}/payrollCorApp`));
      for (const payDataDoc of collectionSnapshot.docs) {
        const payDataId = payDataDoc.id;
        const payData = payDataDoc.data();
        if (payData.name === name && payData.month === month && payData.correctionDetails === correctionDetails) {
          await setDoc(doc(db, `members/${memberDoc.id}/payrollCorApp`, payDataId), {
            name: payData.name,
            month: payData.month,
            correctionState: state,
            correctionDetails: payData.correctionDetails,
            reasonForApplication: payData.reasonForApplication,
          });
          break;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default updateCorrectionState;
