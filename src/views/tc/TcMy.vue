<template>
  <a-row type="flex" :gutter="[13,13]" style="min-height: 500px">
    <a-col :span="8" style="height: 100%; border: 1px solod red">
      <a-avatar :size="280" icon="user" />
      <h1 style="padding: 18px 0 18px 0;">
        <span class="username">{{this.$store.state.user.userName}}</span>
        <!-- <a-button type="link">创建团队</a-button> -->
      </h1>
      <div>
        <span style="margin-right:10px">
          <a-icon type="team" />
          加入团队数: {{this.myAllTeamTotal}}
        </span>
        <span>
          <a-icon type="project" />
          参与项目数: {{this.myAllTeamTotal}}
        </span>
      </div>
    </a-col>
    <a-col :span="16" style="height: 100%; border: 1px solod red">
      <a-card size="small" title="我的团队" :bordered="false">
        <a slot="extra" href="#" @click="showCreateTeamModal">创建团队</a>
        <p>card content</p>
        <p>card content</p>
        <p>card content</p>
      </a-card>
    </a-col>

    <!-- 创建团队的弹框 -->
    <a-modal
      :visible="createTeamVisible"
      title="创建团队"
      cancelText="取消"
      okText="提交"
      :maskClosable="false"
      :keyboard="false"
      @cancel="handleCreateTeamCancel"
      @create="handleCreateTeamSubmit"
    >
      <!-- 创建团队的表单 -->
      <a-form-model ref="createTeamForm" :model="createTeamFormData" :rules="createTeamFormRules">
        <a-form-model-item prop="teamName">
          <a-input v-model="createTeamFormData.teamName" placeholder="请输入团队名" />
        </a-form-model-item>
        <a-form-model-item prop="teamProfile">
          <a-input-password
            type="textarea"
            v-model="createTeamFormData.teamProfile"
            placeholder="团队描述"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-row>
</template>


<script>
// 组件
import TcTeamsApi from "@/api/tc/TcTeamsApi";
import TcTempApi from "@/api/tc/TcTempApi";

export default {
  name: "TcMy",
  data() {
    return {
      createTeamVisible: false,
      createTeamFormData: { teamName: "", avatar: "", teamProfile: "" },
      createTeamFormRules: {
        teamName: [
          { required: true, message: "团队名为必填项", trigger: "change" },
          { min: 3, message: "团队名长度最小为3", trigger: "change" },
          { max: 16, message: "团队名长度超过限制", trigger: "change" }
        ]
      },
      myAllTeamTotal: 0,
      myTeams: []
    };
  },
  created() {
    TcTeamsApi.findMyTeams()
      .then(res => {
        if (!res.data.success) {
          this.$message.error(res.message);
          return;
        }

        let result = res.data;

        //渲染我加入的项目组栏位
        this.myAllTeamTotal = result.total ? result.total : 0;
        this.myTeams = result.content;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    showCreateTeamModal() {
      this.createTeamVisible = true;
    },
    handleCreateTeamCancel() {
      this.createTeamVisible = false;
    },
    handleCreateTeamSubmit() {
      const form = this.$refs["createTeamForm"];
      form.validate(valid => {
        if (!valid) return;

        TcTempApi.createTeam(this.createTeamFormData).then(res => {
          if (!res.data.success) {//提交失败
        
            this.$message.error(res.data.message);
          }
          form.resetFields();
          this.createTeamVisible = false;
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>
.username {
  font-weight: 600;
  font-size: 26px;
  line-height: 30px;
}
</style>
