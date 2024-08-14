import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './Firebase_Config.ts';

const deleteEmployee = async (employeeId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'members', employeeId));
    console.log(`Employee with ID ${employeeId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting employee: ', error);
  }
};

export default deleteEmployee;
