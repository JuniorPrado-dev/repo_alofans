import * as R from "@/utils/requests"
import {BASE_URL} from "@/constants/urls"

const EVENT_URL = BASE_URL + "/event"

export const getEvents = async () : Promise<TypeEventResponse[]> => {
    const url = EVENT_URL+"/list"

    const response = await  R.get(url)
    return response
}

export const getEvent = async (id: string) => {
    const response = await  R.get(`${EVENT_URL}/get?event_id=${id}`)
    return response
}


export const delEvent = async (id: string) => {
    const response = await  R.del(`${EVENT_URL}/delete?event_id=${id}`)
    return response
};