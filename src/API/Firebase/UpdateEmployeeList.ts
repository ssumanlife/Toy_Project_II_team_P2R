import { doc, setDoc } from 'firebase/firestore';
import { db } from './FirebaseConfig.ts';

interface Employee {
  employeeId: string;
  name: string;
  phoneNumber: string;
  workDay: string | string[];
  accountNumber: string;
  baseSalary: string;
}

const updateEmployee = async (employee: Employee): Promise<void> => {
  try {
    const employeeRef = doc(db, 'members', employee.employeeId);
    await setDoc(
      employeeRef,
      {
        name: employee.name,
        phoneNumber: employee.phoneNumber,
        workDay: employee.workDay,
        accountNumber: employee.accountNumber,
        baseSalary: employee.baseSalary,
      },
      { merge: true },
    );
  } catch (error) {
    throw new Error('Failed to update employee');
  }
};

export default updateEmployee;
