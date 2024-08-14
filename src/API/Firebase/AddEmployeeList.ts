import { collection, addDoc } from 'firebase/firestore';
import { db } from './Firebase_Config.ts';

interface Employee {
  employeeId: string;
  name: string;
  phoneNumber: string;
  workDay: string;
  accountNumber: string;
  baseSalary: string;
}

const addEmployee = async (employee: Employee): Promise<void> => {
  try {
    await addDoc(collection(db, 'members'), {
      ...employee,
      isAdmin: false, // 기본값 설정
    });
  } catch (error) {
    console.error('Error adding document: ', error);
    throw new Error('Failed to add employee');
  }
};

export { addEmployee };
