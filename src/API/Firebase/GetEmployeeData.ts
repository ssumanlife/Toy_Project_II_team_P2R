import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase_Config.ts';

interface Employee {
  employeeId: string;
  name: string;
  phoneNumber: string;
  workDay: string;
  accountNumber: string;
  baseSalary: string;
}

const getEmployeeData = async (): Promise<Employee[]> => {
  const employeeData: Employee[] = [];

  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));

    const memberPromises = membersSnapshot.docs.map(async (memberDoc) => {
      const data = memberDoc.data();

      if (!data.isAdmin) {
        const payrollDetailsSnapshot = await getDocs(collection(db, `members/${memberDoc.id}/payrollDetails`));

        const salary = payrollDetailsSnapshot.empty
          ? data.baseSalary || '2100000'
          : payrollDetailsSnapshot.docs[0]?.data().baseSalary || '2100000';

        employeeData.push({
          employeeId: memberDoc.id,
          name: data.name,
          phoneNumber: data.phoneNumber,
          workDay: data.workDay,
          accountNumber: data.accountNumber,
          baseSalary: salary,
        });
      }
    });

    await Promise.all(memberPromises);

    employeeData.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR', { sensitivity: 'base' }));
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }

  return employeeData;
};

export default getEmployeeData;
