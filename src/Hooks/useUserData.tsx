import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../API/Firebase/Firebase_Config.tsx';

const useGetUserData = (docName: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const readUserData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, docName));
        const docData = querySnapshot.docs.map((doc) => doc.data());
        setData(docData);
      } catch (error) {
        console.error(error);
      }
    };

    readUserData();
  }, [docName]);

  return data;
};

export default useGetUserData;

const useGetPayrollData = (collectionName: string) => {
  const [payrollData, setPayrollData] = useState([]);

  useEffect(() => {
    const readMembersCollectionData = async () => {
      try {
        const membersSnapshot = await getDocs(collection(db, 'members'));
        const allDocData = [];

        // eslint-disable-next-line no-restricted-syntax
        for (const memberDoc of membersSnapshot.docs) {
          const userDocId = memberDoc.id;
          // eslint-disable-next-line no-await-in-loop
          const payrollSnapshot = await getDocs(collection(db, `members/${userDocId}/${collectionName}`));
          payrollSnapshot.docs.forEach((payrollDoc) => {
            allDocData.push(payrollDoc.data());
          });
        }
        setPayrollData(allDocData);
      } catch (error) {
        console.log(error);
      }
    };
    readMembersCollectionData();
  }, [collectionName]);
  return payrollData;
};

export { useGetPayrollData, useGetUserData };
