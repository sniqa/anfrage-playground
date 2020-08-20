<template>
  <div class="main-page">
    <Header v-model="serverUrl"></Header>
    <submit :state="btnState" @click="onClick"></submit>
    <div class="content">
      <editor v-model="editorContent"></editor>
      <show-result :result="resultContent"></show-result>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Editor from '@/components/Editor.vue'
import ShowResult from '@/components/ShowResult.vue'
import Submit from '@/components/Submit.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'Home',
  components: {
    Editor,
    ShowResult,
    Submit,
    Header,
  }, //end of components
  data: () => {
    return {
      serverUrl: '',
      editorContent: '',
      resultContent: '',
      btnState: true,
    }
  }, //end of data
  methods: {
    postData(url, data) {
      // Default options are marked with *
      return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json',
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      }).then((response) => response.json()) // parses response to JSON
    }, //end of postData

    onClick() {
      this.btnState = false
      if (this.editorContent === '') {
        this.resultContent = ' Please type Object'
        this.btnState = true
        return
      }

      const jsonObj = JSON.parse(this.editorContent)

      this.postData(this.serverUrl, jsonObj)
        .then((res) => {
          console.log(res)
          this.btnState = true
          this.resultContent = res
        })
        .catch((res) => {
          this.resultContent = res
          this.btnState = true
        })
    }, //end of onClick
  }, // enf of methods

  created() {
    this.serverUrl = window.location.href
  },
}
</script>

<style>
.main-page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 24px;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  background-image: linear-gradient(
    90deg,
    rgb(187, 226, 231),
    rgb(164, 192, 206)
  );
}
:root body {
  margin: 0;
  padding: 0;
}
.content {
  display: flex;
  height: 100%;
  margin: 0 10px 10px 10px;
}
</style>
