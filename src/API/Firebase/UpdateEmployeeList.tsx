import { doc, setDoc } from 'firebase/firestore';
import { db } from './Firebase_Config.tsx'; // Firebase 설정 파일을 가져옵니다.

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
    await setDoc(employeeRef, {
      name: employee.name,
      phoneNumber: employee.phoneNumber,
      workDay: employee.workDay,
      accountNumber: employee.accountNumber,
      baseSalary: employee.baseSalary,
    }, { merge: true }); // 병합 옵션을 사용하여 기존 데이터를 유지하면서 업데이트합니다.
    console.log('Employee successfully updated!');
  } catch (error) {
    console.error('Error updating employee: ', error);
    throw new Error('Failed to update employee');
  }
};

export { updateEmployee };
