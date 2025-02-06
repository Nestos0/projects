<template>
  <nav style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <form @submit.prevent="handleSubmit">

      <div>
        <label for="email">邮箱:</label><br />
        <input type="email" id="email" v-model="formData.email" required />
        <p style="color: red">{{ errorMessage }}</p>
      </div>

      <div>
        <label for="username">用户名:</label><br />
        <input type="text" id="username" v-model="formData.username" required />
      </div>

      <div>
        <label for="password">密码:</label><br />
        <input type="text" id="password" v-model="formData.password" required />
        <p :style="{ color: passwordStrength.color }">{{ passwordStrength.message }}</p>
      </div>

      <button type="submit">提交</button>
    </form>
  </nav>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: "",
      },
      errorMessage: ""
    };
  },
  computed: {
    passwordStrength() {
      const password = this.formData.password;
      if (!password) return { message: "请输入密码", color: "gray" };

      let strength = 0;
      if (password.length >= 8) strength++; // 长度大于8
      if (/[A-Z]/.test(password)) strength++; // 包含大写字母
      if (/[a-z]/.test(password)) strength++; // 包含小写字母
      if (/\d/.test(password)) strength++; // 包含数字
      if (/[\W_]/.test(password)) strength++; // 包含特殊字符

      if (strength <= 2) {
        return { message: "弱密码", color: "red" };
      } else if (strength <= 4) {
        return { message: "中等强度密码", color: "orange" };
      } else {
        return { message: "强密码", color: "green" };
      }
    }
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = "";
      try {
        const response = await axios.post("http://localhost:3000/api/account", this.formData, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        console.log("后端返回的数据:", response.data);
        alert("表单提交成功！");
      } catch (error) {
        if (error.response.status === 409) {
          this.errorMessage = "用户已存在";
          return;
        }

        console.error("表单提交失败:", error);
        alert("表单提交失败，请重试！");
      }
    },
  },
};
</script>
