import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './Firebase_Config.ts';

const deleteEmployee = async (employeeId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'members', employeeId));
  } catch (error) {}
};

export default deleteEmployee;
