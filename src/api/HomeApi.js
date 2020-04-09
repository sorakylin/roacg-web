import {
    RoApi
} from '@/base/ro-axios'


const req = RoApi.public();
const authReq = RoApi.token();

const login = (username, password) => {
    return req.post('/tms/newly-created');
}

export default {
    login
}