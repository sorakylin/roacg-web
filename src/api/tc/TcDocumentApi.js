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
    return tcApi.get(`/document/child-node`, {
        params: {
            "nodeId": parentId
        }
    })
}

//查询从根节点到当前节点的关系
const findNodeChain = (nodeId) => {
    return tcApi.get(`/document/chain`, {
        params: {
            "nodeId": nodeId
        }
    })
}

export default {
    createDir,
    findChildNodes,
    findNodeChain
}