import { collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { db } from './FirebaseConfig.ts';

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
      const collectionSnapshot = await getDocs(collection(db, `members/${memberDoc.id}/calendar`));
      const updateEventPromises = collectionSnapshot.docs.map(async (eventDoc) => {
        const eventId = eventDoc.id;
        const event = eventDoc.data();
        if (id === eventId && event.name === name) {
          await setDoc(doc(db, `members/${memberDoc.id}/calendar`, eventId), {
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
    console.log(error);
  }
};
export default updateCalendarEvent;
