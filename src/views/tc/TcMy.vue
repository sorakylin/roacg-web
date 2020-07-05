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
          参与项目数: {{this.myAllProjectTotal}}
        </span>
      </div>
    </a-col>
    <a-col :span="16" style="height: 100%; border: 1px solod red">
      <a-card size="small" title="我的团队" :bordered="false">
        <a slot="extra" href="#" @click="showCreateTeamModal">创建团队</a>
        <!-- 遍历我参与的所有项目, 展示 -->
        <a-col :span="8" v-for="team in this.myTeams" :key="team.teamId">
          <a-popover placement="right">
            <!-- 鼠标移上来的tip框 -->
            <template slot="title">
              <div class="team-box-width">{{team.teamName}}</div>
            </template>
            <template slot="content">
              <div class="team-box-width">{{team.teamProfile}}</div>
            </template>
            <!-- 项目展示内容  点击就跳到详情页面-->
            <a-card
              hoverable
              class="team-box-width"
              :bodyStyle="{padding: '14px'}"
              @click="$router.push(`/tc/team-detail/${team.teamId}`)"
            >
              <img
                slot="cover"
                :alt="team.teamName"
                src="https://i.loli.net/2020/07/04/MJn8m9qwosVHEAb.jpg"
                height="80px"
              />
              <a-card-meta>
                <template slot="title">
                  <a-tag v-if="team.myRole==1" color="red">组长</a-tag>
                  <a-tag v-if="team.myRole==2" color="blue">元老</a-tag>
                  <a-tag v-if="team.myRole==3">组员</a-tag>
                  {{team.teamName}}
                </template>
                <template slot="description">
                  <div style="min-height: 42px" class="team-desc">{{team.teamProfile}}</div>
                </template>
              </a-card-meta>

              <!-- <a-tag>组员</a-tag> -->
            </a-card>
          </a-popover>
        </a-col>
        <a-row type="flex" :gutter="[6,6]"></a-row>
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
      @ok="handleCreateTeamSubmit"
    >
      <!-- 创建团队的表单 -->
      <a-form-model
        ref="createTeamForm"
        :model="createTeamFormData"
        :rules="createTeamFormRules"
        :label-col="createTeamLabelCol"
        :wrapper-col="createTeamWrapperCol"
      >
        <a-form-model-item prop="teamName" label="团队名称">
          <a-input v-model="createTeamFormData.teamName" placeholder="请输入团队名称" />
        </a-form-model-item>
        <a-form-model-item label="团队描述" prop="teamProfile">
          <a-input-password
            type="textarea"
            v-model="createTeamFormData.teamProfile"
            placeholder="请输入团队描述"
          />
        </a-form-model-item>
        <a-form-model-item label="团队图像" prop="avatar">
          <a-upload
            name="avatar"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            list-type="picture-card"
            :show-upload-list="false"
            :before-upload="beforeUpload"
            @change="handleUploadChange"
            style="width:100%"
          >
            <img
              v-if="createTeamFormData.avatar != undefined && createTeamFormData.avatar!=''"
              :src="createTeamFormData.avatar"
              alt="avatar"
              width="300px"
              height="80px"
            />
            <div v-else>
              <a-icon :type="createTeamUploadLoading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-row>
</template>


<script>
// 组件
import TcTeamsApi from "@/api/tc/TcTeamsApi";
import TcTempApi from "@/api/tc/TcTempApi";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default {
  name: "TcMy",
  data() {
    return {
      createTeamUploadLoading: false, //创建团队的弹框里的上传图片是否加载
      createTeamLabelCol: { span: 6 },
      createTeamWrapperCol: { span: 16 },
      createTeamVisible: false, //创建团队表单显隐
      createTeamFormData: { teamName: "", avatar: "", teamProfile: "" }, //创建团队的表单内容
      createTeamFormRules: {
        //创建团队表单效验规则
        teamName: [
          { required: true, message: "团队名为必填项", trigger: "blur" },
          { min: 3, message: "团队名长度最小为3", trigger: "change" },
          { max: 16, message: "团队名长度超过限制", trigger: "change" }
        ]
      },
      myAllTeamTotal: 0, //我加入的所有团队
      myTeams: [],
      myAllProjectTotal: 0 //我参与的所有项目
    };
  },
  created() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      TcTeamsApi.findMyTeams()
        .then(res => {
          if (!res.data.success) {
            this.$message.error(res.message);
            return;
          }

          let result = res.data.data;

          //渲染我加入的项目组栏位
          this.myAllTeamTotal = result.total ? result.total : 0;
          this.myTeams = result.content;
        })
        .catch(err => {
          console.log(err);
        });
    },
    showCreateTeamModal() {
      this.createTeamVisible = true;
    },
    handleCreateTeamCancel() {
      this.$refs["createTeamForm"].resetFields();
      this.createTeamVisible = false;
    },
    /**
     * 提交表单 (创建团队)
     */
    handleCreateTeamSubmit() {
      const form = this.$refs["createTeamForm"];
      form.validate(valid => {
        if (!valid) return;

        //因为还没做图片上传, 这里先把base64地址去掉
        this.createTeamFormData.avatar = undefined;
        TcTempApi.createTeam(this.createTeamFormData).then(res => {
          if (!res.data.success) {
            //提交失败

            this.$message.error(res.data.msg);
            return;
          }
          form.resetFields();
          this.pageInit(); //重刷页面
          this.createTeamVisible = false;
        });
      });
    },
    /**
     * 创建表单弹框里图片上传事件
     */
    handleUploadChange(info) {
      console.log(info.file.status);
      if (info.file.status === "uploading") {
        this.createTeamUploadLoading = true;
        return;
      }
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj, imageUrl => {
          this.createTeamFormData.avatar = imageUrl;
          this.createTeamUploadLoading = false;
        });
      }
    },
    //过滤创建表单弹框的图片上传
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }

      return isJpgOrPng && isLt2M;
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

.team-box-width {
  width: 240px;
}

.team-desc {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
