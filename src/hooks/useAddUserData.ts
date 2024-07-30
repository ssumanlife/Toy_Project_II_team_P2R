import React, { useEffect, useState } from 'react';
// import { ref, onValue } from 'firebase/database';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase.ts';

const useSetUserData = (name: string, phone: string, email: string, pw: string, bankAccountNumber: string) => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const addUserData = async () => {
      try {
        const docRef = await addDoc(collection(db, name), {
          userName: name,
          phone,
          email,
          pw,
          bankAccountNumber,
        });
        setUserData(docRef.id);
      } catch (error) {
        console.log('Add user data Error');
      }
    };
    addUserData();
  }, [userData]);
  return userData;
};

const useGetUserData = (docName: string) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const readUserData = async () => {
      const querySnapshot = await getDocs(collection(db, docName));
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        // console.log(docData);
        setData(docData);
      });
    };
    readUserData();
  }, [docName]);
  return data;
};
export { useSetUserData, useGetUserData };
