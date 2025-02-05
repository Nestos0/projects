<script>
export default {
  data() {
    return {
      metaTop: null // 用于存储当前路由的 meta 数据
    };
  },
  watch: {
    // 监听路由变化
    '$route'(to) {
      this.metaTop = to.meta.hideTopBar; // 更新 metaTop 的值
    }
  },
};
</script>

<template>

  <div class="container">
    <header v-if="!metaTop" class="fictyra-top">
      <!-- 头像部分 -->
      <div class="avatar-container">
        <RouterLink to="/register">
          <img src="#" alt="用户头像"> <!-- 添加实际头像路径 -->
        </RouterLink>
      </div>

      <!-- 导航菜单 -->
      <nav class="navbar">
        <div class="nav-container">
          <ul class="nav-links">
            <li class="nav-item"><a href="/">首页</a></li>
            <li class="nav-item"><a href="/ranking">排行</a></li>
            <li class="nav-item"><a href="/community">社区</a></li>
            <li class="nav-item"><a href="/about">关于</a></li>
            <div class="bg"></div>
          </ul>
        </div>
      </nav>

      <!-- 搜索框 -->
      <div class="search-box">
        <input class="search-txt" type="text" autocomplete="off" placeholder="搜索...">
        <a class="search-btn" href="#">
          <i class="fas fa-search"></i>
        </a>
      </div>
    </header>
    <main>
      <RouterView />
    </main>

    <footer v-if="!metaTop">
      <a href="#">备案号:?</a>
      <div style="margin-top:20px">
        <a href="#" style="text-decoration: underline;">作者平台</a>
      </div>
    </footer>
  </div>
</template>
