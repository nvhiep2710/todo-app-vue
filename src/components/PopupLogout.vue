<template>
  <div v-if="isShow" :class="$style.wrapper">
    <div :class="$style.content" ref="content">
      <div :class="$style.imageWrapper">
        <img src="../assets/logout.svg" />
      </div>
      <p :class="$style.conntentText">Do you want logout?</p>
      <div :class="$style.confirm">
        <button type="submit" :class="$style.submit" @click="submit">Cancel</button>
        <button :class="$style.close" @click="hide">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from "vuex";

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: true
    };
  },
  watch: {
    open: function() {
      this.isShow = true;
    }
  },
  methods: {
    hide() {
      this.isShow = false;
      this.$emit("close");
    },
    submit() {
      this.$emit("logout");
    }
  }
};
</script>

<style lang="scss" module>
.wrapper {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 999999;
  width: 768px;
  .content {
    width: 90%;
    height: auto;
    position: absolute;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    z-index: 9999999;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: red;
    text-align: center;
    border-radius: 8px;
    padding: 10pt;
    .imageWrapper {
      text-align: center;
      position: absolute;
      top: calc(-130px / 2);
      left: calc(50% - 50px);
      width: 86pt;
      height: 86pt;
    }
    .conntentText {
      margin-top: 45pt;
      margin-bottom: 16pt;
      letter-spacing: 0.4pt;
    }
    .subText {
      margin-bottom: 40pt;
    }
    .confirm {
      display: flex;
      .submit {
        margin-bottom: 24pt;
        padding: 9pt 0;
      }
      .close {
      }
    }
  }
}
@media (max-width: 768px) {
  .wrapper {
    width: 100%;
  }
}
@media (max-height: 1024px) {
  .wrapper {
    height: 100%;
  }
}
</style>