import {
    tcApi
} from '@/base/ro-axios'



//查询最新创建的的团队们
const findNewlyCreatedTeams = function () {
    return tcApi.get('/tms/newly-created');
}

//查询最近活跃的项目组们

const findMostActiveTeams = function () {
    return tcApi.get('/tms/active-most');
}


export default {
    findNewlyCreatedTeams,
    findMostActiveTeams
}