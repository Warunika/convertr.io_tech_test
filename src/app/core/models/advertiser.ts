import { Address } from './address';

export interface Advertiser {
    "@id": string;
    "@type": string;
    id: number;
    name: string;
    orgurl: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    updatedTs: Date;
    address: string;
    _address: Address;
}
