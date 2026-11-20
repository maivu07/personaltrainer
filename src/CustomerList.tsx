import { CSVLink } from 'react-csv'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { getCustomers, deleteCustomer } from './api'
import type { CustomerResponse } from './types'
import AddCustomer from './AddCustomer'
import EditCustomer from './EditCustomer'
import AddTraining from './AddTraining'

function CustomerList() {
    const queryClient = useQueryClient()

    const { isLoading, isError, data } = useQuery({
        queryKey: ['customers'],
        queryFn: getCustomers,
    })

    const { mutate } = useMutation({
        mutationFn: deleteCustomer,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customers'] }),
        onError: (err) => console.error(err),
    })

    // Prepare clean data for CSV — only the real fields, no _links or buttons
    const csvData = data?.map(c => ({
        firstname: c.firstname,
        lastname: c.lastname,
        streetaddress: c.streetaddress,
        postcode: c.postcode,
        city: c.city,
        email: c.email,
        phone: c.phone,
    })) ?? []

    const csvHeaders = [
        { label: 'First Name', key: 'firstname' },
        { label: 'Last Name', key: 'lastname' },
        { label: 'Street Address', key: 'streetaddress' },
        { label: 'Postcode', key: 'postcode' },
        { label: 'City', key: 'city' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
    ]

    const handleDelete = (link: string) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            mutate(link)
        }
    }

    const columns: GridColDef[] = [
        { field: 'firstname', headerName: 'First Name', width: 130 },
        { field: 'lastname', headerName: 'Last Name', width: 130 },
        { field: 'streetaddress', headerName: 'Address', width: 160 },
        { field: 'postcode', headerName: 'Postcode', width: 90 },
        { field: 'city', headerName: 'City', width: 110 },
        { field: 'email', headerName: 'Email', width: 160 },
        { field: 'phone', headerName: 'Phone', width: 130 },
        {
            field: 'edit', headerName: '', width: 70, sortable: false, filterable: false,
            renderCell: (params) => <EditCustomer customerData={params.row} />,
        },
        {
            field: 'addTraining', headerName: '', width: 120, sortable: false, filterable: false,
            renderCell: (params) => <AddTraining customerData={params.row} />,
        },
        {
            field: 'delete', headerName: '', width: 80, sortable: false, filterable: false,
            renderCell: (params) => (
                <Button color="error" size="small"
                    onClick={() => handleDelete(params.row._links.self.href)}>
                    Delete
                </Button>
            ),
        },
    ]

    if (isLoading) return <span>Loading...</span>
    if (isError) return <span>Error fetching customers</span>

    return (
        <>
            <AddCustomer />
            <CSVLink
                data={csvData}
                headers={csvHeaders}
                filename="customers.csv"
                style={{ marginLeft: '10px' }}
            >
                Export CSV
            </CSVLink>
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row: CustomerResponse) => row._links.self.href}
                showToolbar
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                pageSizeOptions={[10, 25]}
            />
        </>
    )
}

export default CustomerList