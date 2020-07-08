import {
    tcApi
} from '@/base/ro-axios'

/**
 *  创建一个项目
 */
const createProject = function (project) {
    return tcApi.post("/t-project", project)
}

const findTeamProjects = function (teamId) {
    return tcApi.get(`/t-project/${teamId}`)
}


export default {
    createProject,
    findTeamProjects
}