import {
    tcApi
} from '@/base/ro-axios'

/**
 *  创建一个团队
 */
const createProject = function (project) {
    return tcApi.post("/t-project", project)
}


export default {
    createProject
}