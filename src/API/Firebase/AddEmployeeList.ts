import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from './FirebaseConfig.ts';

interface Employee {
  employeeId: string;
  name: string;
  phoneNumber: string;
  workDay: string;
  bankName: string;
  accountNumber: string;
  baseSalary: string;
}

const formatPhoneNumber = (phoneNumber: string): string => {
  const fullPhoneNumber = `010${phoneNumber}`;

  const regex = /(\d{3})(\d{4})(\d{4})/;
  const match = fullPhoneNumber.match(regex);

  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return fullPhoneNumber;
};

const addEmployee = async (employee: Employee): Promise<Employee> => {
  try {
    const formattedPhoneNumber = formatPhoneNumber(employee.phoneNumber);
    const fullAccount = employee.bankName ? `${employee.bankName} ${employee.accountNumber}` : employee.accountNumber;

    const docRef = doc(collection(db, 'members'));

    await setDoc(docRef, {
      ...employee,
      employeeId: docRef.id,
      phoneNumber: formattedPhoneNumber,
      accountNumber: fullAccount,
      isAdmin: false,
    });

    return {
      ...employee,
      employeeId: docRef.id,
      phoneNumber: formattedPhoneNumber,
      accountNumber: fullAccount,
    };
  } catch (error) {
    throw new Error('Failed to add employee');
  }
};

export default addEmployee;
