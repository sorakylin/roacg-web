import store from '@/store'

//登陆成功调用的方法 (ajax登录)
const loginSuccess = (user,resHeader) => {
    window.sessionStorage.setItem('ac', resHeader['Set-Token']);
    window.sessionStorage.setItem('ace', resHeader['Set-Token-Expired']);

    window.location.href = "/";
}

export default {
    loginSuccess
}