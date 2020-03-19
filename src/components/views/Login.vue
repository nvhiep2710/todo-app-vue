<template>
  <div class="form">
    <h2>Welcome</h2>
    <div class="form__input-group">
      <input type="text" v-model="email" required @change="handleResetError" />
      <label for>email</label>
      <div v-if="$v.email.$error">
        <p v-if="!$v.email.required">Email required</p>
        <p v-if="!$v.email.minLength">Email minimum of 6 characters in length</p>
      </div>
    </div>
    <div class="form__input-group">
      <input type="password" v-model="password" required @change="handleResetError" />
      <label for>Password</label>
      <div v-if="$v.password.$error">
        <p v-if="!$v.password.required">Password required</p>
        <p v-if="!$v.email.minLength">Password minimum of 6 characters in length</p>
      </div>
    </div>
    <div class="form__submit">
      <span v-if="errorPassword">User account or password is incorrect</span>
      <button type="submit" @click="submit">Login</button>
      <p class="form__signup">
        Don't have account ?
        <router-link :to="{ name: 'register' }">
          <a>Register</a>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      email: null,
      password: null
    };
  },
  validations: {
    email: {
      required,
      minLength
    },
    password: {
      required,
      minLength
    }
  },
  computed: {
    ...mapState("auth", ["errorPassword"])
  },
  methods: {
    ...mapActions("auth", ["login"]),
    ...mapMutations("auth", ["SET_ERROR_PASSWORD"]),
    submit() {
      this.login({ email: this.email, password: this.password });
    },
    handleResetError() {
      this.SET_ERROR_PASSWORD(false);
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  background-color: white;
  text-shadow: 0.4px 4px 12px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 30px;
  width: 500px;
  //   background-image: url("https://image.freepik.com/free-vector/abstract-colorful-background_1159-3704.jpg");
  h2 {
    text-align: center;
    padding: 10px;
    color: #000;
    text-shadow: 0.4px 4px 12px rgba(0, 0, 0, 0.2);
    letter-spacing: 0.9px;
    user-select: none;
  }
  &__input-group {
    margin: 45px 0;
    position: relative;
    input {
      width: 100%;
      display: block;
      border: none;
      border-bottom: 1px solid dodgerblue;
      outline: none;
      padding: 10px 4px;
      background: transparent;
      &:focus + label,
      &:valid + label {
        top: -14px;
        left: 0;
        font-size: 13.5px;
        color: dodgerblue;
        transition: all 200ms;
      }
    }
    label {
      position: absolute;
      top: 5px;
      left: 5px;
      font-size: 12px;
      font-weight: 400;
      color: gray;
      transition: all 200ms;
    }
    p {
      font-size: 14px;
      color: red;
    }
  }
  &__submit {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    button {
      padding: 0.5rem 1rem;
      border: none;
      background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
      width: 100%;
      color: white;
      cursor: pointer;
      border-radius: 20px;
    }
    button:focus {
      outline: none;
    }
    &___signup {
      font-size: 12px;
      text-align: center;
      padding: 10px 0 0 0;
    }
    span {
      font-size: 14px;
      color: red;
    }
  }
}
</style>