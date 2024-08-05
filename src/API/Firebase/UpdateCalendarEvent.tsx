/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from './Firebase_Config.tsx';

const updateCalendarEvent = async (
  eventContent: string,
  eventEndDate: string,
  eventStartDate: string,
  eventTag: string,
  name: string,
) => {
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));
    for (const memberDoc of membersSnapshot.docs) {
      const collectionSnapshot = await getDocs(collection(db, `members/${memberDoc.id}/calendar`));
      for (const eventDoc of collectionSnapshot.docs) {
        const eventId = eventDoc.id;
        const event = eventDoc.data();
        if (event.name === name) {
          await setDoc(doc(db, `members/${memberDoc.id}/calendar`, eventId), {
            eventContent,
            eventEndDate,
            eventStartDate,
            eventTag,
            name,
          });
          break;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default updateCalendarEvent;
