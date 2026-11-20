import { useQuery } from '@tanstack/react-query'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { format } from 'date-fns'
import { getTrainings } from './api'
import type { TrainingWithCustomer } from './types'

function TrainingList() {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['trainings'],
        queryFn: getTrainings,
    })

    const columns: GridColDef[] = [
        { field: 'activity', headerName: 'Activity', width: 150 },
        {
            field: 'date',
            headerName: 'Date',
            width: 180,
            valueFormatter: (value: string) =>
                format(new Date(value), 'dd.MM.yyyy HH:mm'),
        },
        { field: 'duration', headerName: 'Duration (min)', width: 130 },
        {
            field: 'customerName',
            headerName: 'Customer',
            width: 180,
            valueGetter: (_value, row: TrainingWithCustomer) =>
                `${row.customer.firstname} ${row.customer.lastname}`,
        },
    ]

    if (isLoading) return <span>Loading...</span>
    if (isError) return <span>Error fetching trainings</span>

    return (
        <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row: TrainingWithCustomer) => row.id}
            showToolbar
            initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 25]}
        />
    )
}

export default TrainingList