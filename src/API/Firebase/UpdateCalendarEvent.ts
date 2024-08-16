import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './Firebase_Config.ts';

const updateCalendarEvent = async (
  id: string,
  eventContent: string,
  eventEndDate: string,
  eventStartDate: string,
  eventTag: string,
  name: string,
) => {
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));

    const updatePromises = membersSnapshot.docs.map(async (memberDoc) => {
      const calendarQuery = query(collection(db, `members/${memberDoc.id}/calendar`), where('name', '==', name));
      const collectionSnapshot = await getDocs(calendarQuery);

      const updateEventPromises = collectionSnapshot.docs.map(async (eventDoc) => {
        if (eventDoc.id === id) {
          await setDoc(doc(db, `members/${memberDoc.id}/calendar`, eventDoc.id), {
            eventContent,
            eventEndDate,
            eventStartDate,
            eventTag,
            name,
          });
        }
      });

      await Promise.all(updateEventPromises);
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.error('Error updating calendar event:', error);
  }
};

export default updateCalendarEvent;
