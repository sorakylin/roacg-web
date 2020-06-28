import {
  tcApi
} from '@/base/ro-axios'




/**
 * 创建小组 {"teamName": "","avatar": "","teamProfile": ""}
 * @param {team} 
 */

const createTeam = function (team) {
  return tcApi.post("/team", team)
}

/**
 * 更新小组
 * @param {team} {"teamId": 0,"teamName": "","avatar": "","teamProfile": "","teamDescription": ""}
 */
const updateTeam = function (team) {
  return tcApi.put("/team/", team)
}


/**
 * 查询某一个小组的详细信息
 * @param {teamId} 小组ID
 * @return {
  "teamId": 0,
  "teamName": "",
  "leaderId": 0,
  "avatar": "",
  "teamProfile": "",
  "teamDescription": "",
  "teamGrade": 0,
  "teamSize": 0,
  "projectNum": 0,
  "projects": [
    {
      "projectId": 0,
      "projectName": "",
      "projectProfile": "",
      "projectType": "COMMUNITY",
      "projectPermissionStatus": "PUBLIC"
    }
  ],
  "users": [
    {
      "userId": 0,
      "userName": "",
      "avatar": ""
    }
  ]
}
*/
const findTeamDetail = function (teamId) {
  return tcApi.get(`/team/${teamId}`);
}

const USER_TESM_ROLE = {
  TEAM_LEADER: 1, //组长
  OLD_HEAD: 2, //元老
  TEAM_MEMBER: 3 //普通组员
}

export default {
  createTeam,
  updateTeam,
  findTeamDetail,
  USER_TESM_ROLE
}