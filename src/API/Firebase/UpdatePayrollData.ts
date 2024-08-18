import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './FirebaseConfig.ts';

const updatePayrollData = async (
  name: string,
  month: number,
  changeData: string | number,
  isAdmin: boolean | undefined,
) => {
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));
    const payDataSnapshot = membersSnapshot.docs.map(async (memberDoc) => {
      const q = query(
        collection(db, 'members', memberDoc.id, 'payrollDetails'),
        where('name', '==', name),
        where('month', '==', month),
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(async (docSnapshot) => {
        const payData = docSnapshot.data();
        const additionalAllowanceValue = changeData === 'notChange' ? payData.additionalAllowance : changeData;
        const data4Update = {
          ...payData,
          additionalAllowance: additionalAllowanceValue,
          isViewed: !isAdmin ? true : payData.isViewed,
          adminViewed: isAdmin ? true : payData.adminViewed,
        };
        setDoc(doc(db, 'members', memberDoc.id, 'payrollDetails', docSnapshot.id), data4Update);
      });
    });
    await Promise.all(payDataSnapshot);
  } catch (error) {
    console.error('Error updating payroll data:', error);
  }
};

export default updatePayrollData;
