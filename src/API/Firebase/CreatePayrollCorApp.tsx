import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './Firebase_Config.tsx';

const createPayrollCorApp = async (name: string, month: number, option: string, correctionDetails: string) => {
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));
    const promises = membersSnapshot.docs.map(async (memberDoc) => {
      const collectionSnapshot = await getDocs(collection(db, `members/${memberDoc.id}/payrollCorApp`));
      const payDataDocs = collectionSnapshot.docs;
      const promises2 = payDataDocs.map(async (payDataDoc) => {
        const payData = payDataDoc.data();
        if (payData.name === name) {
          await addDoc(collection(db, `members/${memberDoc.id}/payrollCorApp`), {
            name: payData.name,
            month,
            correctionState: 'standBy',
            correctionDetails,
            reasonForApplication: option,
          });
        }
      });
      await Promise.all(promises2);
    });
    await Promise.all(promises);
  } catch (error) {
    console.log(error);
  }
};
export default createPayrollCorApp;
