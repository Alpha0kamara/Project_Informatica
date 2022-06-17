import axios from 'axios';


const Feedback_API_BASE_URL = "http://localhost:8080/api/jaarrekening/";

class JaarRekeningService{
    getJaarRekeningByOndernemingsNummer(Id){
        return axios.get(Feedback_API_BASE_URL + Id);
    }
    getNacbelCode(id){
        return axios.get(Feedback_API_BASE_URL+ id +"/nacbelcode");
    }
    

}
export default new JaarRekeningService();