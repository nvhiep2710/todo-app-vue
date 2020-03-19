<template>
  <div class="form">
    <h2>Register</h2>
    <div class="form__input-group">
      <input type="text" v-model.trim="$v.name.$model" required @change="handleResetError" />
      <label for>Username</label>
      <div v-if="$v.name.$error">
        <p v-if="!$v.name.required ">Username required</p>
        <p v-if="!$v.name.minLength">Username minimum of 6 characters in length</p>
      </div>
    </div>
    <div class="form__input-group">
      <input type="text" v-model.trim="$v.email.$model" required />
      <label for>Email</label>
      <div v-if="$v.email.$error">
        <p v-if="!$v.email.required">Email required</p>
        <p v-if="!$v.email.email">Email is invalid</p>
      </div>
    </div>
    <div class="form__input-group">
      <input type="password" v-model.trim="$v.password.$model" required />
      <label for>Password</label>
      <div v-if="$v.password.$error">
        <p v-if="!$v.password.required">Password required</p>
        <p v-if="!$v.password.minLength">Password minimum of 6 characters in length</p>
      </div>
    </div>
    <div class="form__input-group">
      <input type="password" v-model.trim="$v.confirmPassword.$model" required />
      <label for>Confirm your password</label>
      <div v-if="$v.confirmPassword.$error">
        <p v-if="!$v.confirmPassword.sameAsPassword">The password is not the same</p>
      </div>
    </div>
    <div class="form__submit">
      <button type="input" @click="submit">Register</button>
      <p class="form__signup">
        Do have account ?
        <router-link :to="{ name: 'login' }">
          <a>Login</a>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(6)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: { required, sameAsPassword: sameAs("password") }
  },
  computed: {
    ...mapState("auth", ["errorPassword"])
  },
  methods: {
    ...mapActions("auth", ["register"]),
    ...mapMutations("auth", ["SET_ERROR_REGISTER"]),
    handleResetError() {},
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.register({
          name: this.name,
          email: this.email,
          password: this.password
        });
      }
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
  // background-image: url("https://image.freepik.com/free-vector/abstract-colorful-background_1159-3704.jpg");
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
  }
}
</style>