import axios from 'axios';

const Contract_URL = "http://localhost:8080/api/contract";

class FeedbackService {

    postContract(file){

        let contract = {
            contract : file
        }
        return axios.post(Contract_URL,contract)
    }
}

export default new FeedbackService()