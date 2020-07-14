<template>
  <a-row type="flex" :gutter="[25,25]" style="width: 1200px; margin: 0 auto">
    <!-- 文档文件树 -->
    <a-col :span="20">
      <a-card style="min-height: 130px" :bodyStyle="{'padding':0}">
        <!-- 面包屑, 标识文档路径 -->
        <template slot="title">
          <a-breadcrumb style="font-size:14px;">
            <a-breadcrumb-item>
              <a
                @click="gotoFolder(project.projectId)"
              >{{project.projectName}}</a>
            </a-breadcrumb-item>
            <a-breadcrumb-item v-for="node in currentChain" :key="node.documentId">
              <a @click="gotoFolder(node.documentId)">{{node.documentName}}</a>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </template>
        <!-- 文档路径面包屑结束 -->

        <a slot="extra">
          <a-dropdown placement="bottomRight">
            <a-button>
              <a-icon type="plus" />新建
            </a-button>
            <!-- 【新建】 的下拉菜单 -->
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm
                  placement="leftTop"
                  ok-text="确认"
                  cancel-text="取消"
                  @confirm="createDirConfirm"
                  @visibleChange="createDirVisibleChange"
                >
                  <a-icon slot="icon" theme="filled" type="folder" style="color: #a8d8ea" />
                  <template slot="title">
                    <p>请输入目录名称:</p>
                    <input v-model="createForm.createDirName" placeholder="不超过 20 个字符" />
                  </template>
                  新建目录
                </a-popconfirm>
              </a-menu-item>
              <a-menu-item>新建文档</a-menu-item>
            </a-menu>
          </a-dropdown>
        </a>

        <!-- 文档树渲染 color : https://colorhunt.co/palette/8328-->
        <a-row v-for="doc in documentNodes" :key="doc.documentId" class="treeNode">
          <template v-if="doc.documentType == 1">
            <a-col :span="6">
              <a-icon type="folder" theme="filled" style="color: #a8d8ea" />
              <a @click="gotoFolder(doc.documentId)" style="margin-left: 16px">{{doc.documentName}}</a>
            </a-col>
            <a-col :span="18"></a-col>
          </template>
          <template v-if="doc.documentType == 2">
            <a-col :span="6">
              <a-icon type="file" />
              <a href="javaScript:void(0)" style="margin-left: 16px">{{doc.documentName}}</a>
            </a-col>
            <a-col :span="12"></a-col>
            <a-col :span="6">{{doc.updateTime}}</a-col>
          </template>
        </a-row>
      </a-card>
    </a-col>
    <!-- 侧边栏 -->
    <a-col :span="4">
      <a-row type="flex" :gutter="[8,8]">
        <a-col :span="24">
          <h3>简介</h3>
        </a-col>
        <a-col
          :span="24"
          class="team-profile"
          title="说明...."
          style="margin-bottom: 24px"
        >{{this.project.projectProfile}}</a-col>
      </a-row>
    </a-col>
  </a-row>
</template>


<script>
import TcProjectApi from "@/api/tc/TcProjectApi";
import TcDocumentApi from "@/api/tc/TcDocumentApi";

export default {
  name: "TcProjectDetailInfo",
  props: ["project"],
  data() {
    return {
      projectId: this.$route.params.pid,
      currentNode: null, //当前节点的ID
      currentChain: [],//从根节点到当前节点的路径
      nodeLinkedList: [], //节点链表, 标识了从根节点到当前节点的关系
      documentNodes: [], //渲染出来的文档页面信息
      createForm: {
        createDirName: ""
      }
    };
  },
  created() {
    this.currentNode = this.projectId; //页面加载的时候, 当前节点置为根节点
    this.projectInfoInit();
    this.refreshTree();
  },
  methods: {
    projectInfoInit() {},
    //刷新文档树
    refreshTree() {
      // currentNode
      TcDocumentApi.findChildNodes(this.currentNode).then(res => {
        if (!res.data.success) {
          return;
        }

        this.documentNodes = res.data.data;
      });
      //面包屑构造
      TcDocumentApi.findNodeChain(this.currentNode).then(res => {
        if (!res.data.success) {
          return;
        }

        this.currentChain = res.data.data;
      });
    },
    //创建目录点击确定的回调
    createDirConfirm(e) {
      let dirName = this.createForm.createDirName;
      if (!dirName || dirName.trim().length == 0) {
        this.$message.warning("目录名不能为空");
        return false;
      }

      //判定是否重名, 重名提示

      //提交创建目录的请求
      TcDocumentApi.createDir(
        this.currentNode,
        this.createForm.createDirName
      ).then(res => {
        if (!res.data.success) {
          this.$message.error(res.data.msg);
          return;
        }

        // 创建成功, 刷新当前文件树
        this.refreshTree();
      });
    },
    //创建目录时显隐回调
    createDirVisibleChange(visible) {
      if (visible) {
        this.createForm.createDirName = "";
      }
    },
    //进入文件夹
    gotoFolder(nodeId) {
      this.currentNode = nodeId;
      this.refreshTree();
    }
  }
};
</script>

<style lang="less" scoped>
.treeNode {
  padding: 16px;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  margin-top: -1px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: 14px;
  line-height: 1.5;
  color: #24292e;

  & > div {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  &:hover {
    background-color: #f6f8fa;
  }
}

.linelimit{
  overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
</style>
