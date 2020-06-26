import store from '@/store'

//设置Token
const tokenSetting = (user, resHeader) => {
    localStorage.setItem('token', resHeader['set-token']);
    localStorage.setItem('tokenExpire', resHeader['set-token-expire']);
    localStorage.setItem('ru', JSON.stringify(user));
}

const getToken = () => {
    let token = localStorage.getItem('token');

    if (!token) return undefined;

    let expire = localStorage.getItem('tokenExpire');

    if (Date.now() > expire) return undefined;

    return token;

};

//退出登录
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpire');
    localStorage.removeItem('ru');

    window.location.href = "/";
}

export default {
    tokenSetting,
    logout,
    getToken
}