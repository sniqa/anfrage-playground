<template>
  <div class="footer">
    <button @click="isShow = !isShow">About</button>
    <about v-show="isShow"></about>
  </div>
</template>

<script>
import  About from './About.vue'
  export default {
    data: () => {
      return {
        isShow:false
      }
    },
    components:{
      About
    }
  }
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
  button{
    background: none;
    border: 0;
    outline: none;
    cursor: pointer;
 } 
</style>
