import store from '@/store'

//登陆成功调用的方法 (ajax登录)
const loginSuccess = (user, resHeader) => {
    sessionStorage.setItem('token', resHeader['set-token']);
    sessionStorage.setItem('tokenExpire', resHeader['set-token-expire']);
    sessionStorage.setItem('ru', JSON.stringify(user));

    window.location.href = "/";
}

//退出登录
const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenExpire');
    sessionStorage.removeItem('ru');

    window.location.href = "/";
}

export default {
    loginSuccess,
    logout
}