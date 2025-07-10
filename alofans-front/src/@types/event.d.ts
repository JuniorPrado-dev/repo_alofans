declare global {
    interface TypeEventRequest {
        name: string;
        description: string;
        is_online: boolean;
        link?: string | null;
        state: string;
        city: string;
        neighborhood?: string | null;
        street?: string | null;
        address_number?: string | null;
        complement?: string | null;
        producer_id: string;
        date: string;
    }
    interface TypeEventResponse {
        id: string;
        name: string;
        description: string;
        is_online: boolean;
        link?: string | null;
        state: string;
        city: string;
        neighborhood?: string | null;
        street?: string | null;
        address_number?: string | null;
        complement?: string | null;
        id: string;
        image_path?: string | null;
        date: string;
        producer: TypeUser;
        alo_offers: TypeAloOfferResponse[] | null;
    }
    interface  TypeEventCode {
        security_code: string;
    }
}

export { };