/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './Firebase_Config.tsx';

const addCalendarEvent = async (
  eventContent: string,
  eventEndDate: string,
  eventStartDate: string,
  eventTag: string,
  name: string,
) => {
  if (!eventContent || !eventEndDate || !eventStartDate || !eventTag || !name) {
    throw new Error('Invalid event data');
  }
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));
    for (const memberDoc of membersSnapshot.docs) {
      const memberData = memberDoc.data();
      if (memberData.name === name) {
        await addDoc(collection(db, `members/${memberDoc.id}/calendar`), {
          eventContent,
          eventEndDate,
          eventStartDate,
          eventTag,
          name,
        });
        break;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export default addCalendarEvent;
