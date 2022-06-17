import axios from 'axios';
import authService from '../services/auth-service';

const Krediet_API_BASE_URL = "http://localhost:8080/api/kredietaanvragen/";

class KredietService {

    addKrediet(naam, eigenVermogen, lening, klantId, userId, leningType, looptijd, rentevoet, feedback,leningOmschrijving){
        let krediet = {
            naam: naam,
            klantID: klantId,
            userID: userId,
            eigenVermogen: eigenVermogen,
            lening: lening,
            leningType: leningType,
            looptijd: looptijd,
            rentevoet: rentevoet,
            feedback: feedback,
            leningOmschrijving: leningOmschrijving
        }

       return axios.post(Krediet_API_BASE_URL, krediet);
    }
    getKredieten(){
        return axios.get(Krediet_API_BASE_URL);
    }

    getKredietenByUserID(Userid){
        return axios.get(Krediet_API_BASE_URL + 'user/' + Userid);
    }


    createKrediet(Krediet){
        return axios.post(Krediet_API_BASE_URL, Krediet);
    }

    getKredietById(KredietId){
        return axios.get(Krediet_API_BASE_URL +  KredietId);
    }

    updateKrediet(naam, eigenVermogen,lening,klantId,leningType,looptijd,rentevoet,leningOmschrijving, feedback, userId  , KredietId){
        let KredietObj = {
            id: KredietId,
            feedback:feedback,
            naam:naam,
            eigenVermogen:eigenVermogen,
            lening:lening,
            looptijd: looptijd,
            klantID:klantId,
            userID: userId,
            leningType: leningType,
            rentevoet: rentevoet,
            leningOmschrijving: leningOmschrijving
            
        }


        return axios.put(Krediet_API_BASE_URL +  KredietId, KredietObj);
    }

    deleteKrediet(KredietId){
        return axios.delete(Krediet_API_BASE_URL +  KredietId);
    }
}

export default new KredietService()