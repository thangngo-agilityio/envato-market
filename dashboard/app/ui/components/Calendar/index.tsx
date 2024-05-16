'use client';

// Libs
import { useCallback, useState } from 'react';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  CalendarProps,
  Views,
} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Components
import CustomToolbar from './CustomToolBar';

type ViewType = 'month' | 'week' | 'work_week' | 'day' | 'agenda';

const localizer = momentLocalizer(moment);

const Calendar = (props: Omit<CalendarProps, 'localizer'>) => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<ViewType>(Views.MONTH);

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate],
  );

  const onView = useCallback(
    (newView: ViewType) => setView(newView),
    [setView],
  );

  return (
    <BigCalendar
      {...props}
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '50vh' }}
      date={date}
      onNavigate={onNavigate}
      defaultView={Views.MONTH}
      view={view}
      views={[Views.MONTH, Views.WEEK, Views.DAY]}
      onView={onView}
      components={{ toolbar: CustomToolbar }}
    />
  );
};

export default Calendar;
