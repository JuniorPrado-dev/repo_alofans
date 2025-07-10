declare global {
    interface TypeArtist {
        id: string;
        name: string;
    }
    interface Interlocutor {
        id: string;
        name?: string | null;
        percent: number;
    }
    interface TypeAloOfferRequest {
        alo_cost: number;
        alo_quantity: number;
        free_sample: boolean;
        start_offer: string;
        end_offer: string;
        artist_id: string;
        artistic_name: string;
        event_id: string;
        interlocutors: Interlocutor[];
    }
    interface TypeAloOfferResponse {
        alo_cost: number;
        alo_quantity: number;
        free_sample: boolean;
        id: string;
        artist: TypeArtist;
        interlocutors?: Interlocutor[] | null;
        alos_available: number;
        free_sample_available: number;
        start_offer: string;
        end_offer: string;
    }
}