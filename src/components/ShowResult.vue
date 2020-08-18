<template>
  <div class="show-result">
    <pre class="text-overflow">

    {{result}}
      </pre>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: String | Object | Array
    }
  }
}
</script>

<style>
.show-result {
  height: 100%;
  width: 50%;
  max-width: 50%;
  box-sizing: border-box;
  border: 1px solid #fff;
  background-color: transparent;
  color: rgb(5, 0, 0);
  padding: 0 50px 50px 50px;
  overflow: auto;
}
.text-overflow {
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: keep-all;
  word-break: break-all;
}
</style>