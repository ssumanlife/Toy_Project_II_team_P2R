import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../API/Firebase/Firebase_Config.tsx';

const useGetUserData = (docName: string) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const readUserData = async () => {
      const querySnapshot = await getDocs(collection(db, docName));
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        setData(docData);
      });
    };
    readUserData();
  }, [docName]);
  return data;
};

export default useGetUserData;
