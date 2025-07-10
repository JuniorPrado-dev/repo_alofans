import axios from "axios";

const get = async (url: string, token?: string) => {
    try{
        if (!url) {
            throw new Error('URL is required');
        }
    
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch(error){
        console.log(error);
        throw error;
    }
};

const post = async (url: string, body: any, token?: string) => {
    const response = await axios.post(url, body, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

const put = async (url: string, body: any, token?: string) => {
    const response = await axios.put(url, body, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

const del = async (url: string, token?: string) => {
    const response = await axios.delete(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export { get, post, put, del };