import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './Firebase_Config.tsx';

const addCalendarEvent = async (
  eventContent: string,
  eventEndDate: string,
  eventStartDate: string,
  eventTag: string,
  name: string,
) => {
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
    console.error(error);
  }
};

export default addCalendarEvent;
