import { EnumMarketingFilters } from "@/enums/marketing"
import { EnumProductType } from "@/enums/payment"

const alos = {
    add: `/alo`,
    get: (aloId: string) => aloId ? `/alo?alo_id=${aloId}` : `/alo`,
    confirmPayment: (aloId: string) => `/alo/confirm-payment/${aloId}`,
    updateStatus: (aloId: string, newStatus: string) => `/alo/${aloId}/${newStatus}`,
    delete: (aloId: string) => `/alo/${aloId}`,
    getClientAlos: `/alo/client`,
    getProfessionalAlos: `/alo/professional`,
}

const events = {
    get: (eventId?: string) => eventId ? `/event/${eventId}` : `/event`,
    add: `/event`,
    getCode: (eventId: string) => `/event/code/${eventId}`,
    delete: (eventId: string) => `/event/${eventId}`,
    update: (eventId: string) => `/event/${eventId}`
}

const aloOffers = {
    add: `/event/alo-offer/`,
    update: (offerId: string) => `/event/alo-offer/${offerId}`,
    delete: (offerId: string) => `/event/alo-offer/${offerId}`,
}

const interlocutors = {
    verify: (cpf_cnpj: string) => `/user/professional/${cpf_cnpj}`,
    add: `/event/alo-offer/interlocutor`,
    update: (offerId: string, interlocutorId: string, newPercent: number) => `/event/alo-offer/${offerId}/interlocutor/${interlocutorId}/${newPercent}`,
    delete: (offerId: string, interlocutorId: string) => `/event/alo-offer/${offerId}/interlocutor/${interlocutorId}`,
}

interface TypeFilters {
    [EnumMarketingFilters.CITY]?: string,
    [EnumMarketingFilters.STATE]?: string,
    [EnumMarketingFilters.MARKETING_ID]?: string,
}

const marketing = {
    add: `/marketing`,
    get: (filters?: TypeFilters[]) => {
        let endpoint = "/marketing";

        if (!filters || filters.length < 1) {
            return endpoint;
        }

        const params: string[] = [];

        filters.forEach(filter => {
            Object.entries(filter).forEach(([key, value]) => {
                params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            });
        });

        endpoint += "?" + params.join("&");

        return endpoint;
    },

    negotiate: `/marketing/negotiate`,
    update: (marketingId: string) => `/marketing/${marketingId} `,
    delete: (marketingId: string) => `/marketing/${marketingId} `,
}

const tickets = {
    add: "/ticket",
    getByEvent: (eventId: string) => `/ticket/${eventId} `,
    update: (ticketId: string) => `/ticket/${ticketId} `,
    delete: (ticketId: string) => `/ticket/${ticketId} `,
    getUserTickets: `/ticket/user`,
    reservation: `/ticket/user`,
    cancelReservation: (userTicketId: string) => `/ticket/user${userTicketId} `,
    confirmPayment: (userTicketId: string) => `/ticket/user${userTicketId} `,
}

const users = {
    get: `/user`,
    add: `/user`,
    update: `/user`,
    delete: `/user`,
    promoteToProfessional: `/user/promote-to-professional`,
    login: `/user/login`,
    passwordReset: (email: string) => `/user/reset-password/${email} `,
    professionalData: (cpfCnpj: string) => `/user/professional/${cpfCnpj} `,
}
const payment = {
    getCharge: (productId: string) => `/payment/charge/${productId} `,
    getWallet: `/payment/account`,
    makeWithdraw: `/payment/account/withdraw`,
    buyAlo: (aloId: string) => `/payment/alo/purchase/${aloId} `,
    buyTicket: (userTicketId: string) => `/payment/alo/purchase/${userTicketId} `,
    cancelPayment: (productType: EnumProductType, productId: string) => `/payment/cancel/${productType}/${productId}`,
}

const ENDPOINTS = {
    users,
    tickets,
    alos,
    aloOffers,
    marketing,
    interlocutors,
    events,
    payment
};

export default ENDPOINTS;