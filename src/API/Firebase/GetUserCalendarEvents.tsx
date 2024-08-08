import { collection, query, getDocs } from 'firebase/firestore';
import { db } from './Firebase_Config.tsx';

const getUserCalendarEvents = async (userId: string) => {
  try {
    const q = query(collection(db, `members/user${userId}/calendar`));
    const querySnapshot = await getDocs(q);
    const events: {
      eventContent: string;
      eventEndDate: string;
      eventStartDate: string;
      eventTag: string;
      name: string;
    }[] = [];
    querySnapshot.forEach((doc) =>
      events.push({
        ...(doc.data() as {
          eventContent: string;
          eventEndDate: string;
          eventStartDate: string;
          eventTag: string;
          name: string;
        }),
      }),
    );
    return events;
  } catch (error) {
    console.error('Error fetching user calendar events: ', error);
    return [];
  }
};

export default getUserCalendarEvents;
