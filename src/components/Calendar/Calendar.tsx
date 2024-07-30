/** @jsxImportSource @emotion/react */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { css } from '@emotion/react'; // Import css from @emotion/react
import Button from '../Button';
import CalendarDeleteModal from './Calendar-delete';
import CalendarAddModal from './Calendar-add';

const MyCalendar = () => {
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
  const [events, setEvents] = useState([
    { title: '미팅', start: '2024-07-26', end: '2024-07-26', category: 'skyblue' },
    { title: '점심 약속', start: '2024-07-27', end: '2024-07-27', category: 'green' },
    { title: '운동', start: '2024-07-27', end: '2024-07-27', category: 'pink' },
    { title: '프로젝트 기간', start: '2024-07-15', end: '2024-07-29', category: 'skyblue' },
    { title: '가족 모임', start: '2024-07-21', end: '2024-07-21', category: 'peach' },
  ]);

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

  const outerContainerStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  `;

  const containerStyle = css`
    display: flex;
    position: relative;
    margin: 100px;
    flex: 3;
    border-radius: 20px;
    box-shadow: 0px 4px 30px 0px rgba(215, 215, 215, 0.5);
    background-color: var(--background-sub);
    height: 90vh;
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
      margin-bottom: 15px; // 각 카테고리 사이 간격 추가
    }
    label {
      margin-left: 15px; // 체크박스와 라벨 사이 간격 추가
    }
  `;

  const calendarStyle = css`
    flex: 3;
    padding: 20px;
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
      margin-bottom: 15px; // 각 카테고리 사이 간격 추가
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
    position: absolute; // 버튼을 절대 위치로 설정
    bottom: 20px; // 아래에서 20px
    right: 20px; // 오른쪽에서 20px
  `;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleDateClick = (arg: { date: React.SetStateAction<Date> }) => {
    setSelectedDate(arg.date);
  };

  const getFilteredEvents = () => events.filter((event) => selectedCategories.includes(event.category));

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

  const formatTime = (dateString: string) => {
    const date = new Date(`${dateString}T00:00:00`);
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
  };
  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

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
        {!isAddModalOpen && (
          <div css={calendarStyle}>
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
                  style={{
                    color: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <b>{eventInfo.timeText}</b>
                  <i>{eventInfo.event.title}</i>
                </div>
              )}
            />
          </div>
        )}

        <div css={eventListStyle}>
          {selectedDate && (
            <>
              <h3>{selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'long' })}</h3>
              {getEventsForSelectedDate().length === 0 ? (
                <p>이 날짜에는 일정이 없습니다.</p>
              ) : (
                <ul
                  css={css`
                    list-style-type: none;
                    padding: 0;
                  `}
                >
                  {getEventsForSelectedDate().map((event, index) => (
                    <li
                      key={index}
                      css={css`
                        position: relative;
                        margin-bottom: 15px;
                        background-color: white;
                        border-left: 5px solid ${categoryColors[event.category]};
                        padding: 10px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        position: relative;
                      `}
                    >
                      <span
                        css={css`
                          position: absolute;
                          top: 5px;
                          right: 5px;
                          cursor: pointer;
                        `}
                      >
                        x
                      </span>
                      <p
                        css={css`
                          margin: 0 0 5px 0;
                          font-weight: bold;
                        `}
                      >
                        {event.title}
                      </p>
                      <p
                        css={css`
                          margin: 0;
                          color: var(--text-light-gray);
                        `}
                      >
                        {formatTime(event.start)} - {formatTime(event.end)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <div css={buttonStyle}>
                <Button customWidth="50px" customFontSize="40px" onClick={openAddModal}>
                  +
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <CalendarAddModal isOpen={isAddModalOpen} onClose={closeAddModal} />
    </div>
  );
};

export default MyCalendar;
