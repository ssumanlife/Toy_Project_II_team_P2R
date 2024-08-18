import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
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
    const deletePromises: Promise<void>[] = [];

    membersSnapshot.docs.forEach((memberDoc) => {
      const calendarQuery = query(
        collection(db, `members/${memberDoc.id}/calendar`),
        where('name', '==', name),
        where('eventContent', '==', eventContent),
        where('eventEndDate', '==', eventEndDate),
        where('eventStartDate', '==', eventStartDate),
        where('eventTag', '==', eventTag),
      );

      deletePromises.push(
        getDocs(calendarQuery).then((collectionSnapshot) => {
          collectionSnapshot.docs.forEach((eventDataDoc) => {
            deletePromises.push(deleteDoc(doc(db, `members/${memberDoc.id}/calendar`, eventDataDoc.id)));
          });
        }),
      );
    });

    await Promise.all(deletePromises);
  } catch (error) {
    console.warn('Error deleting calendar event:', error);
  }
};

export default deleteCalendarEvent;
