// src/@types/global.d.ts
declare global {

  interface TypeAloRequest {
    text_message: string;
    client_id: string;
    event_id: string;
    alo_offer_id: string;
  }
  interface TypeAloResponse {
    id: string;
    text_message: string;
    client_id: string;
    event_id: string;
    event_name: string;
    value: number;
    charge: TypeCharge;
    alo_offer_id: string;
    status: AloStatusEnum;
  }

  interface TypeAloOfferRequest {
    alo_cost: number,
    alo_quantity: number,
    free_sample: number,
    event_code?: string,
    start_offer: string,
    end_offer: string,
    artist_id: string,
    artistic_name: string,
    event_id: string,
    interlocutors?: TypeInterlocutor[] | null
  }
  interface TypeAloOfferEdit {
    alo_cost: number,
    alo_quantity: number,
    free_sample: number,
    start_offer: string,
    end_offer: string,
    artistic_name: string,
    interlocutors: TypeInterlocutor[] | null
  }

  type TypeInterlocutor = {
    id: string
    name: string
    percent: number
  }

  type TypeInterlocutorRequest = {
    id: string,
    name: string,
    percent: string
  }

  type TypeInterlocutorUpdate = {
    id: string,
    percent: string
  }

  type TypeAloOfferResponse = {
    id: string
    artist: TypeArtist
    alo_cost: number
    alo_quantity: number
    free_sample: number
    free_sample_available: number
    alos_available: number
    start_offer: string
    end_offer: string
    interlocutors: TypeInterlocutor[] | null
  }
interface TypeStateLocationSendAlo {
    aloOffer: TypeAloOfferResponse;
    event: TypeEventResponse;
  }

interface TypeStateLocationEditOffer {
    aloOffer: TypeAloOfferEdit;
    offerId: string;
  }

interface TypeStateLocationSummary {
    aloOffer: TypeAloOfferResponse;
    aloRequest: TypeAloRequest;
  }

}

// Para evitar que o TypeScript considere este arquivo como um módulo,
// você pode exportar algo vazio.
export { };
