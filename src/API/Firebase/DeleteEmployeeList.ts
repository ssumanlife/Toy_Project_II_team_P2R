import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './Firebase_Config.ts';

const deleteEmployee = async (employeeId: string): Promise<void> => {
  await deleteDoc(doc(db, 'members', employeeId));
};

export default deleteEmployee;
