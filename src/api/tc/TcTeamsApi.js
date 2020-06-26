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

/**
 * 查询我加入的小组
 * @returns total,hasNext,content{
  "teamId": 0,
  "teamName": "",
  "avatar": "",
  "teamProfile": "",
  "teamSize": 0,
  "projectNum": 0,
  "myRole": 0
}
 */
const findMyTeams = function () {
    return tcApi.get("/tms/my")
}


export default {
    findNewlyCreatedTeams,
    findMostActiveTeams,
    findMyTeams
}