import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './FirebaseConfig.ts';

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
    const membersQuery = query(collection(db, 'members'), where('isAdmin', '==', false));
    const membersSnapshot = await getDocs(membersQuery);

    const memberPromises: Promise<void>[] = [];

    membersSnapshot.forEach((memberDoc) => {
      const data = memberDoc.data();

      const payrollDetailsPromise = getDocs(collection(db, `members/${memberDoc.id}/payrollDetails`)).then(
        (payrollDetailsSnapshot) => {
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
        },
      );

      memberPromises.push(payrollDetailsPromise);
    });

    await Promise.all(memberPromises);

    employeeData.sort((a, b) => a.name.localeCompare(b.name, 'ko-KR', { sensitivity: 'base' }));
  } catch (error) {
    console.warn('Error fetching employee data:', error);
  }

  return employeeData;
};

export default getEmployeeData;
