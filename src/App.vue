<template>
  <div id="app">
    <img :src="url" alt="我看不到" />
    <ul class="nav">
      <li>
        <router-link to="/home">首页</router-link>
      </li>
      <li>
        <router-link to="about">关于</router-link>
      </li>
    </ul>
    <div class="show">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      url: require("../src/assets/image/paper.jpg")
    };
  }
};
</script>

<style lang="scss" scoped>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  position: relative;
}
img {
  width: 100%;
  height: 100%;
}
.nav {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  li {
    width: 100px;
    a {
      color: #fff;
      text-decoration: none;
      font-size: 24px;
      font-weight: bold;
    }
    a.active {
        color: lightcoral
    }
  }
}
.show {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>