/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store.ts';
import addCalendarEvent from '../API/Firebase/AddCalendarEvent.ts';
import updateCalendarEvent from '../API/Firebase/UpdateCalendarEvent.ts';
import deleteCalendarEvent from '../API/Firebase/DeleteCalendarEvent.ts';
import getUserCalendarEvents from '../API/Firebase/GetUserCalendarEvents.ts';

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  category: string;
  name: string;
}

interface CalendarState {
  events: CalendarEvent[];
}

const initialState: CalendarState = {
  events: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<CalendarEvent[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<CalendarEvent>) => {
      const index = state.events.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
  },
});

export const { setEvents, addEvent, updateEvent, deleteEvent } = calendarSlice.actions;

export const fetchEvents =
  (userId: string): AppThunk =>
  async (dispatch) => {
    if (!userId) {
      console.warn('User ID is required to fetch events');
      return;
    }

    try {
      const calendarEventData = await getUserCalendarEvents(userId);
      const events = calendarEventData.map((event) => ({
        id: event.id,
        title: event.eventContent,
        start: event.eventStartDate,
        end: event.eventEndDate,
        category: event.eventTag,
        name: event.name,
      }));
      dispatch(setEvents(events));
    } catch (error) {
      console.warn('Failed to fetch events:', error);
    }
  };

export const addEventAsync =
  (newEvent: CalendarEvent): AppThunk =>
  async (dispatch) => {
    try {
      await addCalendarEvent(newEvent.title, newEvent.end, newEvent.start, newEvent.category, newEvent.name);
      dispatch(addEvent(newEvent));
    } catch (error) {
      console.error('Failed to add event:', error);
    }
  };

export const updateEventAsync =
  (updatedEvent: CalendarEvent): AppThunk =>
  async (dispatch) => {
    try {
      await updateCalendarEvent(
        updatedEvent.id,
        updatedEvent.title,
        updatedEvent.end,
        updatedEvent.start,
        updatedEvent.category,
        updatedEvent.name,
      );
      dispatch(updateEvent(updatedEvent));
    } catch (error) {
      console.warn('Failed to update event:', error);
    }
  };

export const deleteEventAsync =
  (eventId: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const eventToDelete = getState().calendar.events.find((event) => event.id === eventId);
      if (eventToDelete) {
        await deleteCalendarEvent(
          eventToDelete.name,
          eventToDelete.category,
          eventToDelete.title,
          eventToDelete.end,
          eventToDelete.start,
        );
        dispatch(deleteEvent(eventId));
      }
    } catch (error) {
      console.warn('Failed to delete event:', error);
    }
  };

export default calendarSlice.reducer;
