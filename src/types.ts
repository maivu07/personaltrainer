export type Customer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
}

export type CustomerResponse = Customer & {
    _links: {
        self: { href: string };
        customer: { href: string };
        trainings: { href: string };
    };
}

export type TrainingWithCustomer = {
    id: number;
    date: string;
    duration: number;
    activity: string;
    customer: {
        id: number;
        firstname: string;
        lastname: string;
    };
}   