<template>
  <div class="profile">
    <div class="profile__image">
      <img src="../../assets/user.svg" alt />
    </div>
    <div class="profile__name">
      <p>{{infoUser.name}}</p>
    </div>
    <div class="profile__info">
      <p>Email:</p>
      <p>{{infoUser.email}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("auth", ["infoUser"])
  }
};
</script>

<style lang="scss" scoped>
.profile {
  background-color: white;
  text-shadow: 0.4px 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 30px;
  width: 500px;
  height: 477px;
  margin: 100px auto 0;
  text-align: center;
  &__image {
    img {
      width: 70px;
      height: 70px;
      border-radius: 100px;
      background: cornsilk;
      border: 5px solid #f2f2f2;
    }
  }
  &__name {
    padding: 10px 0;
    p {
      font-size: 32px;
    }
  }
  &__info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    p {
      font-size: 25px;
    }
  }
}
</style>