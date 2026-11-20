import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Stack } from '@mui/material'
import { updateCustomer } from './api'
import type { Customer, CustomerResponse } from './types'

type Props = { customerData: CustomerResponse }

function EditCustomer({ customerData }: Props) {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const [customer, setCustomer] = useState<Customer>({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '',
    })

    const { mutate } = useMutation({
        mutationFn: (updated: Customer) => updateCustomer(customerData._links.self.href, updated),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customers'] }),
        onError: (err) => console.error(err),
    })

    const handleOpen = () => {
        setCustomer({
            firstname: customerData.firstname, lastname: customerData.lastname,
            streetaddress: customerData.streetaddress, postcode: customerData.postcode,
            city: customerData.city, email: customerData.email, phone: customerData.phone,
        })
        setOpen(true)
    }

    const handleSave = () => {
        mutate(customer)
        setOpen(false)
    }

    return (
        <>
            <Button size="small" onClick={handleOpen}>Edit</Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField label="First Name" value={customer.firstname}
                            onChange={e => setCustomer({ ...customer, firstname: e.target.value })} />
                        <TextField label="Last Name" value={customer.lastname}
                            onChange={e => setCustomer({ ...customer, lastname: e.target.value })} />
                        <TextField label="Street Address" value={customer.streetaddress}
                            onChange={e => setCustomer({ ...customer, streetaddress: e.target.value })} />
                        <TextField label="Postcode" value={customer.postcode}
                            onChange={e => setCustomer({ ...customer, postcode: e.target.value })} />
                        <TextField label="City" value={customer.city}
                            onChange={e => setCustomer({ ...customer, city: e.target.value })} />
                        <TextField label="Email" value={customer.email}
                            onChange={e => setCustomer({ ...customer, email: e.target.value })} />
                        <TextField label="Phone" value={customer.phone}
                            onChange={e => setCustomer({ ...customer, phone: e.target.value })} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditCustomer