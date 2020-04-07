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

        <!-- <a-divider /> -->

        <a-form-model-item>
          <a-button type="primary" @click="login()" block style="height:35px; margin-top:20px">登陆</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </default-layout>
</template>


<script>
import TopHeaderImg from "@/components/ImgTemplate/TopHeaderImg";

export default {
  name: "Login",
  components: { TopHeaderImg },
  data() {
    return {
      formData: {
        username: undefined,
        password: undefined
      },
      rules: {
        username: [
          { required: true, message: "用户名为必填项 ", trigger: "blur" },
          { min: 3, message: "用户名最短需要3个字符", trigger: "blur" },
          { max: 14, message: "用户名最长14个英文或7个汉字", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码为必填项 ", trigger: "blur" },
          { min: 6, message: "密码最短需要6个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      console.log(this.$refs.loginForm);
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#login-content {
  background-color: #f8f9fe;
  min-height: 880px;
}

.login-form {
  width: 330px;
  margin: 0 auto;
  padding: 80px 20px 20px 20px;

  .login-form-item {
    margin-top: 30px;
    .oauth-input {
      height: 40px;
      width: 100%;
      margin: 0 auto;
    }
  }
}
</style>