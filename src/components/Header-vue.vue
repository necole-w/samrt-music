<template>
  <div class="header">
    <img class="icon" src="../assets/images/logo.png">
    <span class="text">Qing music </span>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.header{
  height: 44px;
  text-align: center;
  background-image: linear-gradient(90deg,#222325,#3b3c3f,#222325);
}

.icon{
    /* width:100%; */
    height:70%;
    padding-top:6.5px;
  }
  .text{
    vertical-align:top;
  line-height: 44px;
  margin-left: 15px;
  color: rgb(255, 245, 245);
}
</style>
