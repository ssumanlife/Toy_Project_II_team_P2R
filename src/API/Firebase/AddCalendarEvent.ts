import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './FirebaseConfig.ts';

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
    membersSnapshot.docs.forEach(async (memberDoc) => {
      const memberData = memberDoc.data();
      if (memberData.name === name) {
        await addDoc(collection(db, `members/${memberDoc.id}/calendar`), {
          eventContent,
          eventEndDate,
          eventStartDate,
          eventTag,
          name,
        });
      }
    });
  } catch (error) {
    console.warn(error);
  }
};

export default addCalendarEvent;
