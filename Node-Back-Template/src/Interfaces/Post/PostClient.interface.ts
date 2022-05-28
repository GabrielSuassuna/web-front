import { AddressInterface } from "../Address.interface"

export interface PostClient {
    name: string
    socialName: string
    document: string
    email: string
    password: string,
    addresses: AddressInterface[]
}