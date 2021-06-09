import axios from 'axios';

const Unsplash = axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        'Authorization': 'Client-ID qdZs934i7SfOnborj_6lutXg_d00yAHxdwsQkoqcqzI'
    }
});

export default Unsplash;