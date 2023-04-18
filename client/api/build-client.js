import axios from "axios";


// This enables us to use this function to run axios calls and determine if the request was from the browser or a the server
export default ({req}) => {

     
    if(typeof window === "undefined") {
  // we are on the server

        // This will create like a default axios instance
        return axios.create({
            baseURL: 'http://kesuion-tickets.store',
            headers: req.headers
        });
    } else {
            // we are on the browser/client

            return axios.create({
                baseUrl: '/'
            })
    }
};