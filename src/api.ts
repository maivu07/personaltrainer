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