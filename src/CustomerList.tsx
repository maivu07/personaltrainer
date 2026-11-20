import { useQuery } from '@tanstack/react-query'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { getCustomers } from './api'
import type { CustomerResponse } from './types'

function CustomerList() {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['customers'],
        queryFn: getCustomers,
    })

    const columns: GridColDef[] = [
        { field: 'firstname', headerName: 'First Name', width: 150 },
        { field: 'lastname', headerName: 'Last Name', width: 150 },
        { field: 'streetaddress', headerName: 'Address', width: 180 },
        { field: 'postcode', headerName: 'Postcode', width: 100 },
        { field: 'city', headerName: 'City', width: 130 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'phone', headerName: 'Phone', width: 150 },
    ]

    if (isLoading) return <span>Loading...</span>
    if (isError) return <span>Error fetching customers</span>

    return (
        <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row: CustomerResponse) => row._links.self.href}
            showToolbar
            initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 25]}
        />
    )
}

export default CustomerList