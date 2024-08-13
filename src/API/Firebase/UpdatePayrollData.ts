import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from './Firebase_Config.ts';

const updatePayrollData = async (
  name: string,
  month: number,
  changeData: string | number,
  isAdmin: boolean | undefined,
) => {
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));

    const memberPromises = membersSnapshot.docs.map(async (memberDoc) => {
      const collectionSnapshot = await getDocs(collection(db, `members/${memberDoc.id}/payrollDetails`));

      const payDataPromises = collectionSnapshot.docs.map(async (payDataDoc) => {
        const payDataId = payDataDoc.id;
        const payData = payDataDoc.data();
        const additionalAllowanceValue = changeData === 'notChange' ? payData.additionalAllowance : changeData;

        const data4Update = {
          additionalAllowance: additionalAllowanceValue,
          name: payData.name,
          baseSalary: payData.baseSalary,
          employmentInsurance: payData.employmentInsurance,
          healthInsurance: payData.healthInsurance,
          isViewed: payData.isViewed,
          adminViewed: payData.adminViewed,
          issueDate: payData.issueDate,
          longTermCare: payData.longTermCare,
          month: payData.month,
          nationalPension: payData.nationalPension,
          weeklyHolidayAllowance: payData.weeklyHolidayAllowance,
        };

        if (!isAdmin) {
          data4Update.isViewed = true;
        } else {
          data4Update.adminViewed = true;
        }

        if (payData.name === name && payData.month === month) {
          await setDoc(doc(db, `members/${memberDoc.id}/payrollDetails`, payDataId), data4Update);
        }
      });

      await Promise.all(payDataPromises);
    });

    await Promise.all(memberPromises);
  } catch (error) {
    console.error('Error updating payroll data:', error);
  }
};

export default updatePayrollData;
