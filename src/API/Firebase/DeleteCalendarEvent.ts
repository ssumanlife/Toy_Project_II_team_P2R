import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from './FirebaseConfig.ts';

const deleteCalendarEvent = async (
  name: string,
  eventTag: string,
  eventContent: string,
  eventEndDate: string,
  eventStartDate: string,
) => {
  try {
    const membersSnapshot = await getDocs(collection(db, 'members'));

    const memberDeletionPromises = membersSnapshot.docs.map(async (memberDoc) => {
      const collectionSnapshot = await getDocs(collection(db, `members/${memberDoc.id}/calendar`));

      const eventDeletionPromises = collectionSnapshot.docs
        .filter((eventDataDoc) => {
          const eventData = eventDataDoc.data();
          return (
            eventData.name === name &&
            eventData.eventContent === eventContent &&
            eventData.eventEndDate === eventEndDate &&
            eventData.eventStartDate === eventStartDate &&
            eventData.eventTag === eventTag
          );
        })
        .map((eventDataDoc) => deleteDoc(doc(db, `members/${memberDoc.id}/calendar`, eventDataDoc.id)));

      await Promise.all(eventDeletionPromises);
    });

    await Promise.all(memberDeletionPromises);
  } catch (error) {
    console.error('Error deleting calendar event:', error);
  }
};

export default deleteCalendarEvent;
