import { Dispatch } from '@reduxjs/toolkit';
import requestGet from '../functionsRequest/requestGet';
import { deleteEventInListById, setEventList } from '@/redux/slices/eventListSlice';
import requestDelete from '../functionsRequest/requestDelete';
import { getCookie } from '../cookies';
import ENDPOINTS from '@/utils/endPoints';
import { setEventDetail } from '@/redux/slices/eventDetailSlice';

export const refreshEventList = (dispatch: Dispatch) => {
    const refresh = async () => {
        try {
            const response = await requestGet(ENDPOINTS.events.get())
            console.count("event list");
            
            if (response.status === 200) {
                dispatch(setEventList(response.data))
                return true
            } else {
                console.log("ERROR_UPDATE_EVENT: ", response)
                return null
            }
        } catch (e) {
            console.log("ERROR_UPDATE_EVENT: ", e)
            return null
        }
    }
    return refresh();
}

export const refreshEventDetail = (eventId: string, dispatch: Dispatch) => {
    const refresh = async () => {
        try {
            const response = await requestGet(ENDPOINTS.events.get(eventId))

            if (response.status === 200) {
                dispatch(setEventDetail(response.data))
                return true
            } else {
                console.log("ERROR_UPDATE_EVENT: ", response)
                return null
            }
        } catch (e) {
            console.log("ERROR_UPDATE_EVENT: ", e)
            return null
        }
    }
    return refresh();
}

export const deleteEvent = (dispatch: Dispatch, eventID: string) => {
    const token = getCookie("token")
    const request = async () => {
        try {
            const response = await requestDelete(`/event/${eventID}`,token)
            if (response.status === 200) {
                dispatch(deleteEventInListById(eventID))
                return true
            } else {
                console.log("ERROR_DELETE_EVENT: ", response)
                return false
            }
        } catch (e) {
            console.log("ERROR_DELETE_EVENT: ", e)
            return false
        }
    }
    return request()
}
export const getSecurityCode = (eventID: string) => {
    const token = getCookie("token")
    
    const request = async () => {
        try {
            const response = await requestGet(ENDPOINTS.events.getCode(eventID),token)
            if (response.status === 200) {
                return response.data.security_code
            } else {
                console.log("ERROR_security_Code: ", response)
                return "Não Encontrado!"
            }
        } catch (e) {
            console.log("ERROR_security_Code: ", e)
            return false
        }
    }
    return request()
}
// adicionar depos o add event