import axios from 'axios';

const url = "http://localhost:8080";

export const getMessages = async () => {
    return await axios.get( url + "/messages");
}

export const sendMessage = async (message) => {
    return await axios.post(url + "/message", message);
}