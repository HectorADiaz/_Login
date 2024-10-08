export interface Client {
    clientId?: number,
    clientName?: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    nit: string,
    address: string,
    isActive?: boolean,
    createdAt?: Date,
}