import store from '@/store'

//设置Token
const tokenSetting = (user, resHeader) => {
    sessionStorage.setItem('token', resHeader['set-token']);
    sessionStorage.setItem('tokenExpire', resHeader['set-token-expire']);
    sessionStorage.setItem('ru', JSON.stringify(user));

    window.location.href = "/";
}

const getToken = () => {
    let token = sessionStorage.getItem('token');

    if (!token) return undefined;

    let expire = sessionStorage.getItem('tokenExpire');

    if (Date.now() > expire) return undefined;

    return token;

};

//退出登录
const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenExpire');
    sessionStorage.removeItem('ru');

    window.location.href = "/";
}

export default {
    tokenSetting,
    logout,
    getToken
}