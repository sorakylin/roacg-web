import {
    TcApi
} from '@/base/ro-axios'

const req = TcApi.public();
const authReq = TcApi.token();


//查询最新创建的的团队们
const findNewlyCreatedTeams = function () {
    return req.get('/tms/newly-created');
}

//查询最近活跃的项目组们

const findMostActiveTeams = function () {
    return req.get('/tms/active-most');
}


export default {
    findNewlyCreatedTeams,
    findMostActiveTeams
}