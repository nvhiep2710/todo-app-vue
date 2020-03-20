<template>
  <div class="container">
    <nav class="nav">
      <div class="nav__logo">Todo App</div>
      <div v-if="token" class="nav__logout">
        <h4>
          Hello,
          <span @click="handleClick">{{infoUser.name}}</span>
        </h4>
        <a @click="handleLogout">Logout</a>
      </div>
    </nav>
    <v-dialog />
    <notifications position="bottom right" />
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import PopupLogout from "../PopupLogout";
export default {
  // components: {
  //   PopupLogout
  // },
  data() {
    return {
      isShow: false
    };
  },
  computed: {
    ...mapState("auth", ["infoUser", "token"])
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    handleClick() {
      this.$router.push({ name: "profile" });
    },
    handleLogout() {
      this.$modal.show("dialog", {
        title: "Todo Notification",
        text: "Do you want logout ?",
        buttons: [
          {
            title: "Cancel"
          },
          {
            title: "Logout",
            default: true,
            handler: () => {
              this.logout();
              this.hide();
            }
          }
        ]
      });
    },
    hide() {
      this.$modal.hide("dialog");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  justify-content: center;
  // height: 100vh;
  min-height: 1000px;
  background-color: #f2f2f2;
  .nav {
    background-color: #e0e5ee;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    &__logo {
      font-size: 20px;
      font-weight: 500;
      line-height: 29px;
    }
    &__logout {
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        margin-left: 15px;
        color: red;
        cursor: pointer;
      }
      p,
      h4 {
        cursor: pointer;
      }
    }
  }
}
</style>