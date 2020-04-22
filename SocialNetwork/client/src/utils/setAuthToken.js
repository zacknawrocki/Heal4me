import service from '../api';

const setAuthToken = token => {
    if(token) {
        service.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete service.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;
