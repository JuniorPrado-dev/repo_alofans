import { Dispatch } from "@reduxjs/toolkit/react"
import requestGet from "../functionsRequest/requestGet"
import { setMarketingList } from "@/redux/slices/marketingSlice"
import requestPost from "../functionsRequest/requestPost"
import ENDPOINTS from "@/utils/endPoints"
import { getCookie } from "../cookies"

export const updateMarketingList = (dispatch:Dispatch)=>{
    const request = async ()=>{
        try {
            const response = await requestGet(ENDPOINTS.marketing.get())
            if (response.status === 200) {
                dispatch(setMarketingList (response.data))
            } else {
                console.log("FAIL_UPDATE_MARKETINGS: ", response)
            }
        } catch (e) {
            console.log("ERROR_UPDATE_MARKETINGS: ", e)
        }
    }
    request()
}

export const sendAdvertisingProposal = (data: TypeNegotiateRequest) : Promise<string> => {

    const request = async (data: TypeNegotiateRequest) : Promise<string> => {
        const token = getCookie("token");
        try {
            const response = await requestPost(ENDPOINTS.marketing.negotiate, data,token)
            if (response.status === 200) {
                return response.data.detail
            } else {
                console.log("FAIL_SEND_ADVERTISING_PROPOSAL: ", response)
                return String(response)
            }
        } catch (e) {
            console.log("ERROR_SEND_ADVERTISING_PROPOSAL: ", e)
            return String(e)
        }
    }

    return request(data)
}