import { collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import shortid from 'shortid';
import { comparePassword, hashPassword } from '../../Utils/passwordUtils.tsx';
import { db } from './FirebaseConfig.ts';

interface User {
  name: string;
  employeeId: string;
  isAdmin: boolean;
}

export async function login(employeeId: string, password: string): Promise<User | undefined> {
  try {
    const q = query(collection(db, 'members'), where('employeeId', '==', employeeId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('User not found');
    }

    const document = querySnapshot.docs[0];
    const storedData = document.data();
    const isPasswordMatch = await comparePassword(password, storedData.password);

    if (!isPasswordMatch) {
      throw new Error('Invalid password');
    }

    const user: User = {
      name: storedData.name,
      employeeId: storedData.employeeId,
      isAdmin: storedData.isAdmin,
    };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error: any) {
    throw new Error(error.message || 'An error occurred while logging in');
  }
}

export async function registerUser(
  employeeId: string,
  name: string,
  isAdmin: boolean,
  storeCode: string,
): Promise<void> {
  const initialPassword = 'employee1234';
  const hashedPassword = await hashPassword(initialPassword);
  const employeeNumber = shortid.generate();
  const userId = `user${employeeNumber}`;
  await setDoc(doc(db, 'members', userId), {
    employeeId,
    name,
    storeCode,
    password: hashedPassword,
    isAdmin,
  });
}
