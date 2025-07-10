declare global {

    interface TypeTicketRequest {
        event_id: string;
        value: number;
        quantity: number;
    }
    interface TypeTicketResponse {
        event_id: string;
        value: number;
        quantity: number;
        id: string;
        created_at: string;
        updated_at: string;
    }
    interface TypeUserTicketRequest {
        user_id: string;
        ticket_id: string;
    }
    interface TypeUserTicketResponse {
        user_id: string;
        ticket_id: string;
        id: string;
        has_paid: boolean;
        created_at: string;
        charge?: TypeCharge | null;
    }
}

export { };
