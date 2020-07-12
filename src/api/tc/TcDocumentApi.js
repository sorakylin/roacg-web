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

//查询指定节点下的子节点
const findChildNodes = (parentId) => {
    return tcApi.get(`/document/child-node/${parentId}`)
}

export default {
    createDir,
    findChildNodes
}