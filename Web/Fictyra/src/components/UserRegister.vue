<template>
  <nav style="display: flex; justify-content: center; align-items: center;height: 100vh;">
    <form @submit.prevent="handleSubmit">

      <div>
        <label for="email">邮箱:</label><br />
        <input type="email" id="email" v-model="formData.email" required />
      </div>

      <div>
        <label for="username">用户名:</label><br />
        <input type="text" id="username" v-model="formData.username" required />
      </div>

      <div>
        <label for="username">密码:</label><br />
        <input type="text" id="password" v-model="formData.password" required />
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
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post("http://localhost:3000/submit", this.formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        console.log("后端返回的数据:", response.data);
        alert("表单提交成功！");
      } catch (error) {
        console.error("表单提交失败:", error);
        alert("表单提交失败，请重试！");
      }
    },
  },
};
</script>
