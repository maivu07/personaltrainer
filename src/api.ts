import type { CustomerResponse, TrainingWithCustomer } from './types'

const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api'

export const getCustomers = async (): Promise<CustomerResponse[]> => {
    const response = await fetch(`${BASE_URL}/customers`)
    if (!response.ok) throw new Error('Error fetching customers')
    const data = await response.json()
    return data._embedded.customers
}

export const getTrainings = async (): Promise<TrainingWithCustomer[]> => {
    const response = await fetch(`${BASE_URL}/gettrainings`)
    if (!response.ok) throw new Error('Error fetching trainings')
    return await response.json()
}

import type { Customer } from './types'

// ---- Customer CRUD ----
export const addCustomer = async (customer: Customer): Promise<void> => {
    const response = await fetch(`${BASE_URL}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
    })
    if (!response.ok) throw new Error('Error adding customer')
}

export const updateCustomer = async (link: string, customer: Customer): Promise<void> => {
    const response = await fetch(link, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
    })
    if (!response.ok) throw new Error('Error updating customer')
}

export const deleteCustomer = async (link: string): Promise<void> => {
    const response = await fetch(link, { method: 'DELETE' })
    if (!response.ok) throw new Error('Error deleting customer')
}

// ---- Training ----
export type NewTraining = {
    date: string;
    activity: string;
    duration: number;
    customer: string;   // link to the customer
}

export const addTraining = async (training: NewTraining): Promise<void> => {
    const response = await fetch(`${BASE_URL}/trainings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(training),
    })
    if (!response.ok) throw new Error('Error adding training')
}

export const deleteTraining = async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/trainings/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Error deleting training')
}