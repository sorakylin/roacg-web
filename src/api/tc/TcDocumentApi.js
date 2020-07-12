import {
    tcApi
} from '@/base/ro-axios'

//创建目录
const createDir = function (parentId, dirName) {
    return tcApi.post("/document/dir", {
        "parentId": parentId,
        "dirName": dirName
    })
}

export default {
    createDir
}