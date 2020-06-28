<template>
  <div>
    <a-row :gutter="[25,25]">
      <a-col :span="20">
        <a-input-search placeholder="搜索项目" @search="onSearch" />
      </a-col>
      <a-col :span="4">
        <a-button
          style="background-color:rgb(46, 164, 79);color: white"
          @click="showCreateProjectModal"
        >
          新建项目
          <a-icon type="right" />
        </a-button>
      </a-col>

      <!-- 创建项目弹框 -->
      <a-modal
        :visible="createProjectVisible"
        title="创建项目"
        cancelText="取消"
        okText="创建"
        :maskClosable="false"
        :keyboard="false"
        @cancel="handleCreateProjectCancel"
        @ok="handleCreateProjectSubmit"
      ></a-modal>
    </a-row>
  </div>
</template>


<script>
// 组件
import TcProjectApi from "@/api/tc/TcProjectApi";

//项目内容的隐私状态
const PERMISSION_STATUS = {
  ALL_PUBLIC: 1, //全公开的 (项目信息和具体文档)
  INFO_PUBLIC: 2, //信息是公开的 (只能查看项目信息, 不能看到文档)
  TEAM_PUBLIC: 3, //团队内全公开 (团队成员可以查看所有)
  INFO_TEAM_PUBLIC: 4, //只在团队内公开信息 (团队成员只能查看项目信息)
  ONLY_PARTICIPANT: 5 //仅参加者 (项目信息和具体文档只有项目参与者能看见)
};

export default {
  name: "TcTeamDetailProject",
  props: {
    teamId: Number,
    projects: Array
  },
  data() {
    return {
      createProjectVisible: false,
      createProjectFormData: {
        projectName: "",
        projectProfile: "",
        projectType: 2,
        projectPermissionStatus: PERMISSION_STATUS.ALL_PUBLIC
      },
      createProjectFormRules: {}
    };
  },
  created() {},
  methods: {
    //搜索项目的时候
    onSearch(text) {
      if (!text || text.trim() === "") return;
      console.log(text);
    },
    //创建项目相关
    //创建项目的弹框
    showCreateProjectModal() {
      this.createProjectVisible = true;
    },
    handleCreateProjectCancel() {
      this.createProjectVisible = false;
    },
    handleCreateProjectSubmit() {
      this.createProjectVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
