import { Calendar as BigCalendar, dayjsLocalizer, type View } from 'react-big-calendar'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { getTrainings } from './api'
import type { TrainingWithCustomer } from './types'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = dayjsLocalizer(dayjs)

function Calendar() {
    const [view, setView] = useState<View>('month')
    const [date, setDate] = useState(new Date())

    const { data } = useQuery({
        queryKey: ['trainings'],
        queryFn: getTrainings,
    })

    // Convert each training into a calendar event
    const events = (data ?? []).map((t: TrainingWithCustomer) => ({
        title: `${t.activity} / ${t.customer.firstname} ${t.customer.lastname}`,
        start: new Date(t.date),
        end: new Date(new Date(t.date).getTime() + t.duration * 60000), // start + duration (minutes)
    }))

    return (
        <div style={{ height: 600 }}>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day']}
                view={view}
                onView={(newView) => setView(newView)}
                date={date}
                onNavigate={(newDate) => setDate(newDate)}
            />
        </div>
    )
}

export default Calendar