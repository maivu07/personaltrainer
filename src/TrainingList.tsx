import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { format } from 'date-fns'
import { getTrainings, deleteTraining } from './api'
import type { TrainingWithCustomer } from './types'

function TrainingList() {
    const queryClient = useQueryClient()

    const { isLoading, isError, data } = useQuery({
        queryKey: ['trainings'],
        queryFn: getTrainings,
    })

    const { mutate } = useMutation({
        mutationFn: deleteTraining,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trainings'] }),
        onError: (err) => console.error(err),
    })

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this training?')) {
            mutate(id)
        }
    }

    const columns: GridColDef[] = [
        { field: 'activity', headerName: 'Activity', width: 150 },
        {
            field: 'date', headerName: 'Date', width: 180,
            valueFormatter: (value: string) => format(new Date(value), 'dd.MM.yyyy HH:mm'),
        },
        { field: 'duration', headerName: 'Duration (min)', width: 130 },
        {
            field: 'customerName', headerName: 'Customer', width: 180,
            valueGetter: (_value, row: TrainingWithCustomer) =>
                `${row.customer.firstname} ${row.customer.lastname}`,
        },
        {
            field: 'delete', headerName: '', width: 90, sortable: false, filterable: false,
            renderCell: (params) => (
                <Button color="error" size="small" onClick={() => handleDelete(params.row.id)}>
                    Delete
                </Button>
            ),
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
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[10, 25]}
        />
    )
}

export default TrainingList