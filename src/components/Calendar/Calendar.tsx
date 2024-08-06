/** @jsxImportSource @emotion/react */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import Button from '../Button';
import CalendarDeleteModal from './Calendar-delete';
import CalendarDetailModal from './Calendar-detail';
import CalendarAddModal from './Calendar-add';
import { useAuthContext } from '../../Context/AuthContext.tsx';
import { getCollectionData } from '../../API/Firebase/GetUserData.tsx';
import deleteCalendarEvent from '../../API/Firebase/DeleteCalendarEvent.tsx';
import updateCalendarEvent from '../../API/Firebase/UpdateCalendarEvent.tsx';

const MyCalendar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/home';

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategories, setSelectedCategories] = useState([
    'pink',
    'yellow',
    'peach',
    'green',
    'skyblue',
    'blue',
    'purple',
    'gray',
  ]);
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const categories = ['pink', 'yellow', 'peach', 'green', 'skyblue', 'blue', 'purple', 'gray'];

  const categoryColors = {
    pink: 'var(--calendar-pink)',
    yellow: 'var(--calendar-yellow)',
    peach: 'var(--calendar-peach)',
    green: 'var(--calendar-green)',
    skyblue: 'var(--calendar-skyblue)',
    blue: 'var(--calendar-blue)',
    purple: 'var(--calendar-purple)',
    gray: 'var(--calendar-gray)',
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const isAnyModalOpen = isAddModalOpen || isDeleteModalOpen || isDetailModalOpen;
  const { user } = useAuthContext();

  const outerContainerStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 76px);
    width: 100vw;
  `;

  const containerStyle = css`
    display: flex;
    position: relative;
    margin: 50px;
    flex: 3;
    border-radius: 20px;
    box-shadow: 0px 4px 30px 0px rgba(215, 215, 215, 0.5);
    background-color: var(--background-sub);
    height: auto;
    .fc {
      height: 100%;
    }
    .fc-col-header-cell a {
      color: var(--text-gray);
    }
    .fc-day-sat a,
    .fc-col-header-cell.fc-day-sat {
      color: #3a80e9;
    }
    .fc-day-sun a,
    .fc-col-header-cell.fc-day-sun {
      color: #f64d4d;
    }
    .fc-daygrid-day {
      border: none;
    }
    .fc-col-header {
      border-bottom: 1px solid #ddd;
    }
    .fc td,
    .fc th {
      border: none;
    }
    .fc-daygrid-day-frame {
      padding: 2px;
    }
    .fc-theme-standard .fc-scrollgrid {
      border: none;
    }
    .fc-theme-standard thead {
      border-left: none;
      border-right: none;
    }
    .fc-theme-standard td {
      border-left: none;
      border-right: none;
    }
    .fc-scrollgrid-section-body > td {
      border-bottom: none;
    }

    .fc-prev-button,
    .fc-next-button {
      background-color: var(--background-main);
      border: none;
    }

    .fc-icon-chevron-left::before,
    .fc-icon-chevron-right::before {
      color: var(--text-gray);
    }
  `;

  const sidebarStyle = css`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    div,
    h3 {
      margin-bottom: 15px;
    }
    label {
      margin-left: 15px;
    }
  `;

  const calendarStyle = css`
    flex: 3;
    padding: 20px;
    cursor: pointer;
    background-color: var(--background-main);
    .fc {
      height: 100%;
    }
  `;

  const eventListStyle = css`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    h3 {
      margin-bottom: 15px;
    }
  `;

  const checkboxStyle = (category: string) => css`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  `;
  const checkboxLabelStyle = (category: string) => css`
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 1.1rem;
    user-select: none;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 1.1rem;
      height: 1.1rem;
      background-color: ${categoryColors[category]};
      border: 2px solid ${categoryColors[category]};
      border-radius: 4px;
    }

    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 0.3rem;
      top: 0.1rem;
      width: 0.4rem;
      height: 0.7rem;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  `;

  const checkboxInputStyle = css`
    &:checked + label:after {
      display: block;
    }
  `;

  const buttonStyle = css`
    position: absolute;
    bottom: 20px;
    right: 20px;
  `;

  const ulStyle = css`
    list-style-type: none;
    padding: 0;
  `;

  const liStyle = (category: string) => css`
    position: relative;
    margin-bottom: 15px;
    background-color: white;
    border-left: 5px solid ${categoryColors[category]};
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    cursor: pointer;
  `;

  const spanStyle = css`
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  `;

  const pTitleStyle = css`
    margin: 0 0 5px 0;
    font-weight: bold;
  `;

  const pTimeStyle = css`
    margin: 0;
    color: var(--text-light-gray);
  `;

  const calendarContainerStyle = css`
    ${calendarStyle}
    ${isAnyModalOpen &&
    css`
      pointer-events: none;
    `}
  `;
  const openDeleteModal = (event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };
  const handleDateClick = (arg: { date: React.SetStateAction<Date> }) => {
    setSelectedDate(arg.date);
  };
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const openDetailModal = (event: Event) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
  };
  const handleSaveEvent = async (updatedEvent) => {
    try {
      if (!user) {
        console.error('사용자 정보를 찾을 수 없습니다.');
        return;
      }
      await updateCalendarEvent(
        updatedEvent.title,
        updatedEvent.end,
        updatedEvent.start,
        updatedEvent.category,
        user.name,
      );

      setEvents((prevEvents) => prevEvents.map((event) => (event === selectedEvent ? updatedEvent : event)));
      setIsDetailModalOpen(false);
    } catch (error) {
      console.error('이벤트 업데이트 중 오류 발생:', error);
    }
  };
  const getFilteredEvents = () =>
    events.filter((event) => selectedCategories.includes(event.category) && event.name === user?.name);

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    const selectedDateString = selectedDate.toLocaleDateString('en-CA');
    return getFilteredEvents().filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return (
        selectedDateString >= eventStart.toLocaleDateString('en-CA') &&
        selectedDateString <= eventEnd.toLocaleDateString('en-CA')
      );
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    if (Number.isNaN(date.getTime())) {
      return '시간 정보 없음';
    }
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const handleDeleteEvent = async () => {
    if (eventToDelete) {
      try {
        await deleteCalendarEvent(
          eventToDelete.name,
          eventToDelete.category,
          eventToDelete.title,
          eventToDelete.end,
          eventToDelete.start,
        );
        setEvents((prevEvents) => prevEvents.filter((event) => event !== eventToDelete));
        setEventToDelete(null);
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error('이벤트 삭제 중 오류 발생:', error);
      }
    }
  };
  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  useEffect(() => {
    const userIsAdminVelidation = () => {
      user?.isAdmin ? setIsAdmin(true) : setIsAdmin(false);
    };
    userIsAdminVelidation();
  }, [isAdmin]);

  useEffect(() => {
    const fetchEvents = async () => {
      const calendarEventData = await getCollectionData('calendar');
      const setCalendarEventData = [];
      for (let i = 0; i < calendarEventData.length; i++) {
        if (user?.isAdmin || calendarEventData[i].name === user?.name) {
          const data = {
            id: i + 1,
            title: calendarEventData[i].eventContent,
            start: calendarEventData[i].eventStartDate,
            end: calendarEventData[i].eventEndDate,
            category: calendarEventData[i].eventTag,
            backgroundColor: categoryColors[calendarEventData[i].eventTag],
            borderColor: categoryColors[calendarEventData[i].eventTag],
            name: calendarEventData[i].name,
          };
          setCalendarEventData.push(data);
        }
      }
      setEvents(setCalendarEventData);
    };

    fetchEvents();
  }, [user]);

  if (isHomePage) {
    return (
      <div css={containerStyle}>
        <div css={calendarContainerStyle}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={getFilteredEvents().map((event) => ({
              ...event,
              backgroundColor: categoryColors[event.category],
              borderColor: categoryColors[event.category],
            }))}
            dateClick={handleDateClick}
            headerToolbar={{
              left: 'prev',
              center: 'title',
              right: 'next',
            }}
            eventContent={(eventInfo) => (
              <div
                css={css`
                  background-color: ${categoryColors[eventInfo.event.extendedProps.category]};
                  color: white;
                  border-radius: 3px;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                `}
              >
                {eventInfo.event.title}
              </div>
            )}
          />
        </div>
      </div>
    );
  }
  return (
    <div css={outerContainerStyle}>
      <div css={containerStyle}>
        <div css={sidebarStyle}>
          <h3>개인 캘린더</h3>
          {categories.map((category) => (
            <div key={category}>
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                css={[checkboxStyle(category), checkboxInputStyle]}
              />
              <label htmlFor={category} css={checkboxLabelStyle(category)}>
                {category}
              </label>
            </div>
          ))}
        </div>
        <div css={calendarContainerStyle}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={getFilteredEvents().map((event) => ({
              ...event,
              backgroundColor: categoryColors[event.category],
              borderColor: categoryColors[event.category],
            }))}
            dateClick={handleDateClick}
            headerToolbar={{
              left: 'prev',
              center: 'title',
              right: 'next',
            }}
            eventContent={(eventInfo) => (
              <div
                css={css`
                  background-color: ${categoryColors[eventInfo.event.extendedProps.category]};
                  color: white;
                  border-radius: 3px;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                `}
              >
                {eventInfo.event.title}
              </div>
            )}
          />
        </div>

        <div css={eventListStyle}>
          {selectedDate && (
            <>
              <h3>{selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}</h3>
              {getEventsForSelectedDate().length === 0 ? (
                <p>이 날짜에는 일정이 없습니다.</p>
              ) : (
                <ul css={ulStyle}>
                  {getEventsForSelectedDate().map((event, index) => (
                    <li key={index} css={liStyle(event.category)} onClick={() => openDetailModal(event)}>
                      <span
                        css={spanStyle}
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(event);
                        }}
                      >
                        x
                      </span>
                      <p css={pTitleStyle}>{event.title}</p>
                      <p css={pTimeStyle}>
                        {formatTime(event.start)} - {formatTime(event.end)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <div css={buttonStyle}>
                <Button customWidth="44px" customFontSize="30px" onClick={openAddModal}>
                  +
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <CalendarAddModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddEvent={handleAddEvent} />
      <CalendarDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
        onDelete={handleDeleteEvent}
      />
      <CalendarDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
        }}
        event={selectedEvent}
        onSave={handleSaveEvent}
      />
    </div>
  );
};

export default MyCalendar;
