/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from './Firebase_Config.tsx';

const deleteCalendarEvent = async (
  name: string,
  eventTag: string,
  eventContent: string,
  eventEndDate: string,
  eventStartDate: string,
) => {
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));
    for (const memberDoc of membersSnapshot.docs) {
      const collectionSnapshot = await getDocs(collection(db, `members/${memberDoc.id}/calendar`));
      for (const eventDataDoc of collectionSnapshot.docs) {
        const eventData = eventDataDoc.data();
        if (
          eventData.name === name &&
          eventData.eventContent === eventContent &&
          eventData.eventEndDate === eventEndDate &&
          eventData.eventStartDate === eventStartDate &&
          eventData.eventTag === eventTag
        ) {
          await deleteDoc(doc(db, `members/${memberDoc.id}/calendar`, eventDataDoc.id));
          break;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default deleteCalendarEvent;
