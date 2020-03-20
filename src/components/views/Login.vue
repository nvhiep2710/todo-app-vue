<template>
  <div class="form">
    <h2>Welcome</h2>
    <div class="form__input-group">
      <input type="text" v-model.trim="$v.email.$model" required @change="handleResetError" />
      <label for>email</label>
      <div v-if="$v.email.$error">
        <p v-if="!$v.email.required">Email required</p>
        <p v-if="!$v.email.email">Email is invalid</p>
      </div>
    </div>
    <div class="form__input-group">
      <input type="password" v-model.trim="$v.password.$model" required @change="handleResetError" />
      <label for>Password</label>
      <div v-if="$v.password.$error">
        <p v-if="!$v.password.required">Password required</p>
        <p v-if="!$v.password.minLength">Password minimum of 6 characters in length</p>
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
    <div id="gSignInWrapper">
      <a class="btnFacebook" @click="fbLogin">
        <img src="../../assets/facebook.svg" />
      </a>
      <div id="customBtn" class="customGPlusSignIn">
        <span class="btn-social">
          <img src="../../assets/brands-and-logotypes.svg" alt />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";

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
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  computed: {
    ...mapState("auth", ["errorPassword"])
  },
  mounted() {
    this.SET_ERROR_PASSWORD(false);
    // google
    window.gapi.load("auth2", () => {
      const auth2 = window.gapi.auth2.init({
        client_id:
          "678468918763-ime7ndudeammqc7pju4ot8r33u4lac1r.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin"
      });
      this.attachSignin(auth2, document.getElementById("customBtn"));
    });

    window.fbAsyncInit = function() {
      window.FB.init({
        appId: "529828920925941",
        cookie: true,
        xfbml: true,
        version: "v5.0"
      });
    };
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  },
  methods: {
    ...mapActions("auth", ["loginGoogle", "login", "loginFacebook"]),
    ...mapMutations("auth", ["SET_ERROR_PASSWORD"]),

    // login google
    attachSignin(auth2, element) {
      var login = this.loginGoogle;
      auth2.attachClickHandler(element, {}, function(googleUser) {
        const res = googleUser;
        login({ social_id: res.Ca, name: res.Qt.Ad });
      });
    },

    // login facebook
    fbLogin() {
      window.FB.login(
        response => {
          console.log(response);
          this.loginFacebook(response.authResponse.userID);
          if (response.authResponse) {
            window.FB.api("/me", function() {});
          }
        },
        { scope: "email", auth_type: "rerequest" }
      );
    },

    async submit() {
      this.SET_ERROR_PASSWORD(false);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        await this.login({ email: this.email, password: this.password });
        if (!this.errorPassword) {
          this.$notify({
            type: "success",
            title: "Todo Notification",
            text: "Login success !!!"
          });
        }
      }
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
  height: 477px;
  margin: 100px auto 0;
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
      border-bottom: 1px solid #e0e5ee;
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
      font-size: 12px;
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
      // background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
      background-color: #0171e3;
      width: 100%;
      color: white;
      cursor: pointer;
      border-radius: 20px;
    }
    button:focus {
      outline: none;
    }
    p {
      text-align: center;
      padding: 18px 0px;
    }
    span {
      font-size: 12px;
      color: red;
    }
  }
  #gSignInWrapper {
    display: flex;
    justify-content: space-around;
    .btnFacebook {
      -webkit-transition: all 0.3s ease-in;
      transition: all 0.3s ease-in;
      width: 100%;
      margin-left: auto;
      font-size: 13pt;
      color: #000;
      width: 50px;
      height: 50px;
      border-radius: 100px;
      margin: 0 auto;
      img {
        width: 28px;
        vertical-align: middle;
        margin-top: 11px;
      }
      &:hover {
        color: #ffffff;
        background-color: #f2f2f2;
      }
    }
    margin: 0 auto;
    width: 30%;
    cursor: pointer;
    text-align: center;
    .customGPlusSignIn {
      -webkit-transition: all 0.3s ease-in;
      transition: all 0.3s ease-in;
      width: 100%;
      margin-left: auto;
      font-size: 13pt;
      color: #000;
      width: 50px;
      height: 50px;
      border-radius: 100px;
      margin: 0 auto;
      span {
        img {
          width: 28px;
          vertical-align: middle;
          margin-top: 11px;
        }
      }

      &:hover {
        color: #ffffff;
        background-color: #f2f2f2;
      }
    }
  }
}
</style>