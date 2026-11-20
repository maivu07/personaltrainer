import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Stack } from '@mui/material'
import { addCustomer } from './api'
import type { Customer } from './types'

const empty: Customer = {
    firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '',
}

function AddCustomer() {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const [customer, setCustomer] = useState<Customer>(empty)

    const { mutate } = useMutation({
        mutationFn: addCustomer,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['customers'] }),
        onError: (err) => console.error(err),
    })

    const handleClose = () => {
        setOpen(false)
        setCustomer(empty)
    }

    const handleSave = () => {
        mutate(customer)
        handleClose()
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>Add Customer</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
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
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddCustomer