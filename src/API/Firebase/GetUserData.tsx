import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase_Config.tsx';

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

    // eslint-disable-next-line no-restricted-syntax
    for (const memberDoc of membersSnapshot.docs) {
      const userDocId = memberDoc.id;
      // eslint-disable-next-line no-await-in-loop
      const collectionSnapshot = await getDocs(collection(db, `members/${userDocId}/${collectionName}`));
      collectionSnapshot.docs.forEach((obj) => {
        allDocData.push(obj.data());
      });
    }
  } catch (error) {
    console.log(error);
  }
  return allDocData;
};

export { getCollectionData, getUserData };
