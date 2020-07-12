import {
    tcApi
} from '@/base/ro-axios'

/**
 *  创建一个项目
 */
const createProject = function (project) {
    return tcApi.post("/t-project", project)
}

// 查询指定团队下的所有项目
const findTeamProjects = function (teamId) {
    return tcApi.get(`/t-project/${teamId}`)
}

//查询项目详情
const findProjectDetail = function (projectId) {
    return tcApi.get(`/project`, {
        params: {
            "pid": projectId
        }
    })
}


export default {
    createProject,
    findTeamProjects,
    findProjectDetail
}