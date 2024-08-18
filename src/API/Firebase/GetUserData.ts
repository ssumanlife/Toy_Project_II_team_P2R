import { collection, getDocs } from 'firebase/firestore';
import { db } from './FirebaseConfig.ts';

interface CollectionData {
  [key: string]: any;
}

const getUserData = async (docName: string) => {
  const docData: CollectionData[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, docName));
    docData.push(querySnapshot.docs.map((doc) => doc.data()));
  } catch (error) {
    console.error(error);
  }
  return docData;
};

const getCollectionData = async (collectionName: string) => {
  const allDocData: CollectionData[] = [];
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));

    const memberPromises = membersSnapshot.docs.map(async (memberDoc) => {
      const userDocId = memberDoc.id;
      const collectionSnapshot = await getDocs(collection(db, `members/${userDocId}/${collectionName}`));
      collectionSnapshot.docs.forEach((obj) => {
        allDocData.push(obj.data());
      });
    });

    await Promise.all(memberPromises);
  } catch (error) {
    console.error(error);
  }
  return allDocData;
};

export { getCollectionData, getUserData };
