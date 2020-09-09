<template>
  <div class="btn" @click="onClick">
    <!-- <i className="material-icons">pause</i> -->
    <i class="icon-pause" v-if="state"></i>
    <i class="icon-start" v-else></i>
  </div>
</template>

<script>
  export default {
    name: "submit",
    props: {
      state: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      onClick() {
        this.$emit("click")
      },
    },
  }
</script>

<style>
  .btn {
    position: absolute;
    left: 50%;
    top: 10%;
    margin-left: -40px;
    z-index: 99;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #fff;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .btn .icon-pause {
    width: 0;
    height: 0;
    border-top: 14px solid transparent;
    border-bottom: 14px solid transparent;
    border-left: 20px solid black;
    margin-left: 6px;
  }
  .btn .icon-start {
    width: 10px;
    height: 24px;
    border: 6px solid black;
    border-top: none;
    border-bottom: none;
  }
</style>
