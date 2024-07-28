/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { css } from '@emotion/react';

const MyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCategories, setSelectedCategories] = useState(['work', 'personal', 'health']);
  const [events, setEvents] = useState([
    { title: '미팅', start: '2024-07-26', end: '2024-07-26', category: 'work' },
    { title: '점심 약속', start: '2024-07-27', end: '2024-07-27', category: 'personal' },
    { title: '운동', start: '2024-07-27', end: '2024-07-27', category: 'health' },
    { title: '프로젝트 기간', start: '2024-07-15', end: '2024-07-29', category: 'work' },
    { title: '가족 모임', start: '2024-07-21', end: '2024-07-21', category: 'personal' },
  ]);

  const categories = ['work', 'personal', 'health'];

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
  };

  const containerStyle = css`
    display: flex;
    height: 65vh;
    width: 110vh;
    background-color: #f0f0f0;

    .fc-prev-button,
    .fc-next-button {
      background-color: transparent;
      border: none;
    }

    .fc-icon-chevron-left::before,
    .fc-icon-chevron-right::before {
      color: black;
    }
  `;

  const sidebarStyle = css`
    flex: 1;
    padding: 20px;
    background-color: #f0f0f0;
    overflow-y: auto;
  `;

  const calendarStyle = css`
    flex: 3;
    padding: 20px;
    .fc {
      height: 100%;
    }
  `;

  const eventListStyle = css`
    flex: 1;
    padding: 20px;
    background-color: #f0f0f0;
    overflow-y: auto;
  `;

  const checkboxStyle = css`
    margin-right: 10px;
  `;

  const getFilteredEvents = () => events.filter((event) => selectedCategories.includes(event.category));

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    return getFilteredEvents().filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return (
        selectedDateString >= eventStart.toISOString().split('T')[0] &&
        selectedDateString <= eventEnd.toISOString().split('T')[0]
      );
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  return (
    <div css={containerStyle}>
      <div css={sidebarStyle}>
        <h2>카테고리 필터</h2>
        {categories.map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              id={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              css={checkboxStyle}
            />
            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
      <div css={calendarStyle}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={getFilteredEvents()}
          dateClick={handleDateClick}
          headerToolbar={{
            left: 'prev',
            center: 'title',
            right: 'next',
          }}
          eventContent={(eventInfo) => (
            <>
              <b>{eventInfo.timeText}</b>
              <i>{eventInfo.event.title}</i>
              <span style={{ marginLeft: '5px', fontSize: '0.8em' }}>({eventInfo.event.extendedProps.category})</span>
            </>
          )}
        />
      </div>
      <div css={eventListStyle}>
        {selectedDate && (
          <>
            <h3>{selectedDate.toDateString()} 일정</h3>
            {getEventsForSelectedDate().length === 0 ? (
              <p>이 날짜에는 일정이 없습니다.</p>
            ) : (
              <ul>
                {getEventsForSelectedDate().map((event, index) => (
                  <li
                    key={index}
                    css={css`
                      margin-bottom: 15px;
                    `}
                  >
                    <h4>{event.title}</h4>
                    <p>카테고리: {event.category}</p>
                    <p>시작: {new Date(event.start).toLocaleString()}</p>
                    <p>종료: {new Date(event.end).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
