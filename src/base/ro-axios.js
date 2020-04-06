import axios from "axios";


const baseURL = process.env.VUE_APP_APIURL;

//默认的基础配置 
const axiosBaseConfig = {
    baseURL: process.env.VUE_APP_APIURL,
    timeout: 5000,

}

//系统 system
class RoApi {

    static public() {
        return axios.create(axiosBaseConfig);
    }

    static token() {

        let config = Object.assign({}, axiosBaseConfig, {
            headers: {
                "Authorization": ""
            }
        });

        return axios.create(config);
    }


}

//tc
class TcApi {

    url = axiosBaseConfig.baseURL + '/tc';

    static public() {

        // Object.assign 后面的属性覆盖前面的属性
        let config = Object.assign({}, axiosBaseConfig, {
            baseURL: url
        });

        return axios.create(config);
    }

    static token() {

        let config = Object.assign({}, axiosBaseConfig, {
            baseURL: url,
            headers: {
                "Authorization": ""
            }
        });

        return axios.create(config);
    }
}


export {
    RoApi,
    TcApi
};