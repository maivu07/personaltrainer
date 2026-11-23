import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import _ from 'lodash'
import { getTrainings } from './api'
import type { TrainingWithCustomer } from './types'

function Statistics() {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['trainings'],
        queryFn: getTrainings,
    })

    if (isLoading) return <span>Loading...</span>
    if (isError) return <span>Error fetching trainings</span>

    // Group trainings by activity, then sum the durations of each group
    const grouped = _.groupBy(data, 'activity')
    const chartData = Object.keys(grouped).map(activity => ({
        activity: activity,
        minutes: _.sumBy(grouped[activity], (t: TrainingWithCustomer) => t.duration),
    }))

    return (
        <div style={{ padding: '20px' }}>
            <h2>Statistics — minutes by activity</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="activity" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="minutes" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Statistics