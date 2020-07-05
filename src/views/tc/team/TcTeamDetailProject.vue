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
        width="580px"
      >
        <!-- 创建项目时提交的表单 -->
        <a-form-model
          ref="createTeamForm"
          :model="createProjectFormData"
          :rules="createProjectFormRules"
          :label-col="createProjectLabelCol"
          :wrapper-col="createProjectWrapperCol"
        >
          <a-form-model-item prop="projectName" label="项目名称">
            <a-input v-model="createProjectFormData.projectName" placeholder="请输入项目名称" />
          </a-form-model-item>

          <a-form-model-item label="项目描述" prop="projectProfile">
            <a-input-password
              type="textarea"
              v-model="createProjectFormData.projectProfile"
              placeholder="请输入项目描述"
            />
          </a-form-model-item>

          <a-form-model-item label="可见选项" prop="projectPermissionStatus">
            <a-select
              :default-value="createProjectFormData.projectPermissionStatus"
              style="width: 120px"
              v-model="createProjectFormData.projectPermissionStatus"
              @change="changeProjectPermission"
              :dropdownMatchSelectWidth="false"
            >
              <a-select-option :value="PERMISSION_STATUS.ALL_PUBLIC">全公开</a-select-option>
              <a-select-option :value="PERMISSION_STATUS.INFO_PUBLIC">信息公开</a-select-option>
              <a-select-option :value="PERMISSION_STATUS.TEAM_PUBLIC">团队内全公开</a-select-option>
              <a-select-option :value="PERMISSION_STATUS.INFO_TEAM_PUBLIC">团队内信息公开</a-select-option>
              <a-select-option :value="PERMISSION_STATUS.ONLY_PARTICIPANT">仅参加者</a-select-option>
            </a-select>
            <span style="font-size: 12px; margin-left: 5px" v-text="changeProjectPermissionTips"></span>
          </a-form-model-item>

          <a-form-model-item label="翻译模型">
            <a-input-group compact>
              <a-select v-model="createProjectFormData.fromLanguage" default-value="英文" style="width: 150px;">
                <a-select-option
                  v-for="language in TRANS_LANGUAGE"
                  :key="language"
                  :value="language"
                >{{language}}</a-select-option>
              </a-select>
              <a-input
                style=" width: 50px; border-right: 0; pointer-events: none; backgroundColor: #fff"
                placeholder=" -> "
                disabled
              />
              <a-select v-model="createProjectFormData.toLanguage" default-value="中文(简体)" style="width: 150px; border-left: 0">
                <a-select-option
                  v-for="language in TRANS_LANGUAGE"
                  :key="language"
                  :value="language"
                >{{language}}</a-select-option>
              </a-select>
            </a-input-group>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
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

//翻译的语言
const TRANS_LANGUAGE = [
  "中文(简体)",
  "中文(繁体)",
  "英语",
  "日语",
  "韩语",
  "法语",
  "俄语",
  "德语",
  "印度语",
  "意大利语",
];

export default {
  name: "TcTeamDetailProject",
  props: {
    teamId: Number,
    projects: Array
  },
  data() {
    return {
      TRANS_LANGUAGE: TRANS_LANGUAGE,
      PERMISSION_STATUS: PERMISSION_STATUS,
      createProjectVisible: false,
      createProjectFormData: {
        projectName: "",
        projectProfile: "",
        fromLanguage: "", //源语言
        toLanguage: "", //新语言
        projectType: 2,
        projectPermissionStatus: PERMISSION_STATUS.ALL_PUBLIC,
        teamId: this.teamId
      },
      createProjectFormRules: {},
      createProjectLabelCol: { span: 6 },
      createProjectWrapperCol: { span: 16 },
      changeProjectPermissionTips: ""
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
      //提交表单 TODO...
      console.log(this.createProjectFormData)
      this.createProjectVisible = false;
    },
    //弹框里的可见性被修改时触发
    changeProjectPermission(value) {
      switch (value) {
        case PERMISSION_STATUS.ALL_PUBLIC: {
          this.changeProjectPermissionTips = "";
          break;
        }
        case PERMISSION_STATUS.INFO_PUBLIC: {
          this.changeProjectPermissionTips = "只能访问项目信息, 不能访问文档";
          break;
        }
        case PERMISSION_STATUS.TEAM_PUBLIC: {
          this.changeProjectPermissionTips = "团队内成员可以访问所有信息";
          break;
        }
        case PERMISSION_STATUS.INFO_TEAM_PUBLIC: {
          this.changeProjectPermissionTips = "仅有团队内成员能访问项目信息";
          break;
        }
        case PERMISSION_STATUS.ONLY_PARTICIPANT: {
          this.changeProjectPermissionTips = "仅有参与者能访问";
          break;
        }
      } //switch end....
    }
  }
};
</script>

<style lang="less" scoped>
</style>
