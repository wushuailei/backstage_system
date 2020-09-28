<template>
  <div class="login">
    <div class="container">
      <div class="content">
        <h1>WARFRAME</h1>
        <p>
          The Grineer, with their endless clone armies, have plunged the system into chaos. There is only one force that can match them, you.
          You are Tenno, an ancient warrior, a master of gun and blade. You wield the mighty Warframes and command their awesome powers. Forge your weapons. Gather like-minded Tenno and take the fight back to the Grineer. The Origin System needs you once again. Are you ready?
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Login extends Vue {}
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url(../../assets/images/abc.jpg);
  background-position: center top;
  background-size: cover;
}
.content {
  width: 30vw;
  height: 30vh;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -20vh;
  margin-left: -15vw;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 2;
  padding: 50px;
  box-sizing: border-box;
}

.content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-filter: blur(20px);
  -moz-filter: blur(20px);
  -ms-filter: blur(20px);
  -o-filter: blur(20px);
  filter: blur(20px);
  z-index: -3;
  margin: -30px;
  background-image: url(../../assets/images/abc.jpg);
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
}

.content h1 {
  text-align: center;
  margin-bottom: 20px;
}

.content p {
  text-indent: 2em;
  line-height: 1.7;
}
</style>