import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from './Firebase_Config.ts';

const updateCorrectionState = async (name: string, month: number, state: string, correctionDetails: string) => {
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));

    const memberPromises = membersSnapshot.docs.map(async (memberDoc) => {
      const collectionSnapshot = await getDocs(collection(db, `members/${memberDoc.id}/payrollCorApp`));

      const payDataPromises = collectionSnapshot.docs.map(async (payDataDoc) => {
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
        }
      });

      await Promise.all(payDataPromises);
    });

    await Promise.all(memberPromises);
  } catch (error) {
    console.error('Error updating correction state:', error);
  }
};

export default updateCorrectionState;
