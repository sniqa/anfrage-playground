<template>
  <div class="footer">
    <span>Create by</span>
    <a href="https://vuejs.org/" target="_blank">Vue.js</a>
    <a href="https://codemirror.net/" target="_blank">CodeMirror</a>
  </div>
</template>

<script>
  export default {}
</script>

<style>
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    height: 38px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
    margin-right: 10px;
  }
  .footer span {
    margin: 0 5px;
  }
  .footer a {
    margin: 0 5px;
  }
</style>
