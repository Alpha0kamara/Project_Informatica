import axios from 'axios';
import authService from './auth-service';

const BlackList_API_BASE_URL = "http://localhost:8080/api/blacklist/";

class BlackListService {

    addBlackList(naam, nacbelCode){
        let BlackList = {
            naam: naam,
            nacbelCode: nacbelCode
        }

       return axios.post(BlackList_API_BASE_URL, BlackList);
    }
    getBlackLists(){
        return axios.get(BlackList_API_BASE_URL);
    }

    createBlackList(BlackList){
        return axios.post(BlackList_API_BASE_URL, BlackList);
    }

    getBlackListById(BlackListId){
        return axios.get(BlackList_API_BASE_URL +  BlackListId);
    }

    updateBlackList(BlackList, BlackListId){
        return axios.put(BlackList_API_BASE_URL +  BlackListId, BlackList);
    }

    deleteBlackList(BlackListId){
        return axios.delete(BlackList_API_BASE_URL +  BlackListId);
    }
}

export default new BlackListService()