import {
    tcApi
} from '@/base/ro-axios'

const createProject = function (project) {
    return tcApi.post("/project", project)
}


export {
    createProject
}