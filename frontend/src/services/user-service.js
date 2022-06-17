import axios from 'axios';
import authHeader from '../components/login/auth-header';
import authService from '../services/auth-service';

const API_URL = 'http://localhost:8080/users';
class UserService {
    getAll() {
        return axios.get(API_URL, { headers: authHeader()} );
    }
    getUser(id) {
        return axios.get(API_URL + "/" + `${id}`, { headers: authHeader() });
    }
    
    
    update(id, firstName, lastName, email, password) {

        return axios.put(API_URL + "/" + `${id}`,
            {
                firstName,
                lastName,
                email,
                password
            });
    }
    deleteUser(id){
        return axios.delete(API_URL +"/" + `${id}`);
    }
    

    getUserByMail(mail){
        return axios.get(API_URL+"/mail/"+mail)
    }
    getUserByRoleKlant(){
        return axios.get(API_URL + "/klant")
    }
    getKlantScoreCurrentUser(){
        return axios.get(API_URL+ "/"+ authService.getCurrentUser().id )
    }


}
export default new UserService();