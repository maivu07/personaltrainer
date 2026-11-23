import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Stack } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { type Dayjs } from 'dayjs'
import { addTraining } from './api'
import type { CustomerResponse } from './types'

type Props = { customerData: CustomerResponse }

function AddTraining({ customerData }: Props) {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Dayjs | null>(null)
    const [activity, setActivity] = useState('')
    const [duration, setDuration] = useState('')

    const { mutate } = useMutation({
        mutationFn: addTraining,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['trainings'] }),
        onError: (err) => console.error(err),
    })

    const handleClose = () => {
        setOpen(false)
        setDate(null)
        setActivity('')
        setDuration('')
    }

    const handleSave = () => {
        if (!date || !activity || !duration) {
            alert('Please fill in all fields.')
            return
        }
        mutate({
            date: date.toISOString(),            // ISO-8601 as the API requires
            activity: activity,
            duration: Number(duration),
            customer: customerData._links.self.href,  // link to this customer
        })
        handleClose()
    }

    return (
        <>
            <Button size="small" onClick={() => setOpen(true)}>Add Training</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <DateTimePicker
                            label="Date"
                            value={date}
                            onChange={newValue => setDate(newValue)}
                        />
                        <TextField label="Activity" value={activity}
                            onChange={e => setActivity(e.target.value)} />
                        <TextField label="Duration (min)" type="number" value={duration}
                            onChange={e => setDuration(e.target.value)} />
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

export default AddTraining