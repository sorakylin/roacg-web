<template>
  <default-layout>
    <top-header-img></top-header-img>

    <div id="login-content">
      <a-form-model class="login-form" ref="loginForm" :model="formData" :rules="rules">
        <a-form-model-item class="login-form-item" prop="username">
          <a-input class="oauth-input" v-model="formData.username" placeholder="请输入用户名" />
        </a-form-model-item>
        <a-row></a-row>
        <a-form-model-item class="login-form-item" prop="password">
          <a-input-password class="oauth-input" v-model="formData.password" placeholder="请输入密码" />
        </a-form-model-item>

        <a-row>
          <a-divider style="margin: 14px 0 4px 0" />
        </a-row>

        <a-row style="line-height: 16px;margin-bottom: 6px">
          <a-col :span="16"></a-col>
          <a-col :span="8">
            <a-button type="link" block size="small">忘记密码?</a-button>
          </a-col>
        </a-row>

        <a-form-model-item>
          <a-row :gutter="[6,6]">
            <a-col :span="12">
              <a-button
                type="primary"
                @click="login()"
                block
                style="height:35px;"
                :loading="loginLoading "
              >登陆</a-button>
            </a-col>
            <a-col :span="12">
              <a-button block style="height:35px;">
                <router-link to="/register">注册</router-link>
              </a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-form-model>
    </div>
  </default-layout>
</template>


<script>
import TopHeaderImg from "@/components/ImgTemplate/TopHeaderImg";

import HomeApi from "@/api/HomeApi";
import UserHelper from "@/common/js/user-helper";

export default {
  name: "Login",
  components: { TopHeaderImg },
  data() {
    return {
      loginLoading: false,
      formData: {
        username: undefined,
        password: undefined
      },
      rules: {
        username: [
          // { required: 3, message: "用户名长度不正确 ", trigger: "blur" }
          { required: true, message: "用户名为必填项 ", trigger: "blur" }
          // { min: 3, message: "用户名最短需要3个字符", trigger: "blur" },
          // { max: 14, message: "用户名最长14个英文或7个汉字", trigger: "blur" }
        ],
        password: [
          { min: 6, message: "密码长度必须大于6 ", trigger: "blur" }
          // { required: true, message: "密码为必填项 ", trigger: "blur" },
          // { min: 6, message: "密码最短需要6个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击登录按钮
    login() {
      if (this.loginLoading) return;

      this.$refs["loginForm"].validate(valid => {
        if (!valid) return;

        this.loginLoading = true;
        //登录请求
        HomeApi.login(this.formData.username, this.formData.password)
          .then(res => {
            setTimeout(() => (this.loginLoading = false), 500);

            if (!res.data.success) {
              this.$message.error(res.message);
              return;
            }

            //登录成功处理
            // UserHelper.tokenSetting(res.data.data, res.headers);
            //响应拦截器里截取到 set-token 头就会设置到浏览器储存里边去， 所以这里只要做个跳转
            window.location.href = "/";
          })
          .catch(err => {
            setTimeout(() => (this.loginLoading = false), 500);
            this.$message.error("登陆失败");
          });
      });
    }
  }
};
</script>

<style lang="less" scoped>
#login-content {
  background-color: #f8f9fe;
  min-height: 780px;
  padding-top: 50px;
}

.login-form {
  border-radius: 5px;
  box-shadow: 0 2px 8px #f0f1f2;
  background-color: white;
  width: 330px;
  margin: 0 auto;
  padding: 30px 20px 20px 20px;
  margin-top: 80px;

  .login-form-item {
    margin-top: 15px;
    .oauth-input {
      height: 40px;
      width: 100%;
      margin: 0 auto;
    }
  }
}
</style>