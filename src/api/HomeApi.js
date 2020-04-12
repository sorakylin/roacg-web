import {
    RoApi
} from '@/base/ro-axios'


const req = RoApi.public();
const authReq = RoApi.token();

const login = (username, password) => {
    return req.post('/login', {
        "username": username,
        "password": password
    });
}

export default {
    login
}