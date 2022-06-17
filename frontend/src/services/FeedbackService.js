import axios from 'axios';

const Feedback_API_BASE_URL = "http://localhost:8080/api/feedback/";

class FeedbackService {

    getAlleFeedback(){
        return axios.get(Feedback_API_BASE_URL);
    }

    createFeedback(FeedbackStatus , FeedbackOmschrijving, FeedbackId){
        let FeedbackObj = {
            documentId: FeedbackId,
            omschrijving: FeedbackOmschrijving,
            status: FeedbackStatus
        }
        return axios.post(Feedback_API_BASE_URL, FeedbackObj)
    }

    getFeedbackById(FeedbackId){
        return axios.get(Feedback_API_BASE_URL +  FeedbackId);
    }

    updateFeedback(FeedbackStatus , FeedbackOmschrijving, FeedbackId){
        let FeedbackObj = {
            documentId: FeedbackId,
            omschrijving: FeedbackOmschrijving,
            status: FeedbackStatus
        }
        return axios.put(Feedback_API_BASE_URL+FeedbackId, FeedbackObj)
    }

    deleteFeedback(FeedbackId){
        return axios.delete(Feedback_API_BASE_URL +  FeedbackId);
    }
}

export default new FeedbackService()