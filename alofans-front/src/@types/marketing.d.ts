declare global {

    interface TypeNegotiateRequest {
        name: string;
        email: string;
        phone: string;
        message: string;
    }
    interface TypeMarketingRequest {
        is_global: boolean;
        state: string;
        city: string;
    }
    interface TypeMarketingResponse {
        is_global: boolean;
        state: string;
        city: string;
        id: string;
        image_path: string;
        created_at: string;
        updated_at: string;
    }
}

export { };
