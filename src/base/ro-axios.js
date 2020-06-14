import axios from "axios";
import UserHelper from "@/common/js/user-helper"

const baseURL = process.env.VUE_APP_APIURL;

//默认的基础配置 
const axiosBaseConfig = {
    baseURL: baseURL,
    timeout: 5000,
}

//系统 system
class RoApi {
    static axios() {
        let config = Object.assign({}, axiosBaseConfig);

        return axios.create(config);
    }
}

//tc
class TcApi {
    static axios() {
        let config = Object.assign({}, axiosBaseConfig, {
            baseURL: baseURL + '/tc'
        });

        return axios.create(config);
    }
}

//拦截器设置
function interceptorSetting(axiosInstance) {

    let token = UserHelper.getToken();

    //  request 拦截器
    axiosInstance.interceptors.request.use(config => {
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + `${token}`; //给headers挂载token       
        }
        return config;
    }, error => {
        return Promise.reject(error);
    })

    //  response 拦截器
    axiosInstance.interceptors.response.use(res => {

        //刷新token用的
        if (res.headers['set-token']) {
            UserHelper.tokenSetting(res.data.data, res.headers)
        }

        return Promise.resolve(res);
    }, error => {
        return Promise.reject(error);
    })

}


const roApi = RoApi.axios();
const tcApi = TcApi.axios();

interceptorSetting(roApi);
interceptorSetting(tcApi);


export {
    roApi,
    tcApi
};