import {
    roApi
} from '@/base/ro-axios'


const login = (username, password) => {
    return roApi.post('/login', {
        "username": username,
        "password": password
    });
}

export default {
    login
}