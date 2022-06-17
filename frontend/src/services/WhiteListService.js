import axios from 'axios';
import authService from './auth-service';

const WhiteList_API_BASE_URL = "http://localhost:8080/api/whitelist/";

class WhiteListService {

    addWhiteList(naam, nacbelCode){
        let WhiteList = {
            naam: naam,
            nacbelCode: nacbelCode
        }

       return axios.post(WhiteList_API_BASE_URL, WhiteList);
    }
    getWhiteLists(){
        return axios.get(WhiteList_API_BASE_URL);
    }

    createWhiteList(WhiteList){
        return axios.post(WhiteList_API_BASE_URL, WhiteList);
    }

    getWhiteListById(WhiteListId){
        return axios.get(WhiteList_API_BASE_URL +  WhiteListId);
    }

    updateWhiteList(WhiteList, WhiteListId){
        return axios.put(WhiteList_API_BASE_URL +  WhiteListId, WhiteList);
    }

    deleteWhiteList(WhiteListId){
        return axios.delete(WhiteList_API_BASE_URL +  WhiteListId);
    }
}

export default new WhiteListService()