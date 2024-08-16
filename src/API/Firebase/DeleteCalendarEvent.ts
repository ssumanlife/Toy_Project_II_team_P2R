import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from './Firebase_Config.ts';

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
      const calendarQuery = query(
        collection(db, `members/${memberDoc.id}/calendar`),
        where('name', '==', name),
        where('eventContent', '==', eventContent),
        where('eventEndDate', '==', eventEndDate),
        where('eventStartDate', '==', eventStartDate),
        where('eventTag', '==', eventTag),
      );
      const collectionSnapshot = await getDocs(calendarQuery);

      const eventDeletionPromises = collectionSnapshot.docs.map((eventDataDoc) =>
        deleteDoc(doc(db, `members/${memberDoc.id}/calendar`, eventDataDoc.id)),
      );

      await Promise.all(eventDeletionPromises);
    });

    await Promise.all(memberDeletionPromises);
  } catch (error) {
    console.error('Error deleting calendar event:', error);
  }
};

export default deleteCalendarEvent;
