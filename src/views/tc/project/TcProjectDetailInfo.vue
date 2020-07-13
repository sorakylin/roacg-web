<template>
  <a-row type="flex" :gutter="[25,25]" style="width: 1200px; margin: 0 auto">
    <!-- 文档文件树 -->
    <a-col :span="20">
      <a-card style="min-height: 130px" :bodyStyle="{'padding':0}">
        <template slot="title">{{project.projectName}}</template>
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
              <a href="javaScript:void(0)" style="margin-left: 16px">{{doc.documentName}}</a>
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
      currentNode: null,
      documentNodes: [],
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
</style>
