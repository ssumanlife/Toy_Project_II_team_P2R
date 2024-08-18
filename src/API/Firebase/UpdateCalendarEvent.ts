import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
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
    const updatePromises: Promise<void>[] = [];

    membersSnapshot.docs.forEach((memberDoc) => {
      const calendarQuery = query(collection(db, `members/${memberDoc.id}/calendar`), where('name', '==', name));

      updatePromises.push(
        getDocs(calendarQuery).then((collectionSnapshot) => {
          collectionSnapshot.docs.forEach((eventDoc) => {
            if (eventDoc.id === id) {
              updatePromises.push(
                setDoc(doc(db, `members/${memberDoc.id}/calendar`, eventDoc.id), {
                  eventContent,
                  eventEndDate,
                  eventStartDate,
                  eventTag,
                  name,
                }),
              );
            }
          });
        }),
      );
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.warn('Error updating calendar event:', error);
  }
};

export default updateCalendarEvent;
