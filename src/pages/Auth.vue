<template>
  <div class="flex column authBase q-py-xl">
    <div class="text-h3 text-center q-mb-md text-weight-light">toneygram</div>
    <!-- Form Base -->
    <div class="formBase q-mb-sm">
      <!-- Tabs -->
      <q-tabs
        v-model="tab"
        align="justify"
        narrow-indicator
        dense
        class="q-mb-md"
      >
        <q-tab class="text-grey-5" name="login" label="Log in" />
        <q-tab class="text-grey-5" name="register" label="Register" />
      </q-tabs>
      <!-- Tab -->
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="fade"
        transition-next="fade"
        class="text-white text-center"
      >
        <!-- Login -->
        <q-tab-panel name="login" class="q-py-none q-pb-md">
          <q-form style="overflow: hidden">
            <q-input
              color="grey-3"
              autofocus
              label-color="grey-5"
              type="email"
              lazy-rules
              dense
              :rules="[
                (val) => validateEmail(val) || 'Please insert a valid email',
              ]"
              v-model="login.email"
              label="Email"
            >
            </q-input>
            <q-input
              label-color="grey-5"
              lazy-rules
              dense
              type="password"
              :rules="[
                (val) =>
                  val.length >= 6 || 'Please enter more than 6 characters',
              ]"
              v-model="login.password"
              label="Password"
            >
            </q-input>
            <q-btn
              label="Log In"
              type="submit"
              color="green-3"
              class="full-width"
              text-color="white"
              @keyup.enter.prevent="logInUser"
              @click="logInUser"
              ref="logInButton"
              :disable="loginButtonActive"
            />
          </q-form>
        </q-tab-panel>
        <!-- Register -->
        <q-tab-panel name="register" class="q-py-none q-pb-md">
          <q-form>
            <!-- username -->
            <q-input
              color="grey-3"
              autofocus
              label-color="grey-5"
              dense
              autocapitalize="none"
              lazy-rules
              type="text"
              v-model="register.username"
              :rules="[
                (val) =>
                  val.length >= 3 ||
                  'Your username has to be longer than 3 characters',
              ]"
              label="Username"
            />
            <!-- full name -->
            <q-input
              color="grey-3"
              label-color="grey-5"
              dense
              autocapitalize="none"
              lazy-rules
              type="text"
              v-model="register.fullName"
              :rules="[
                (val) =>
                  val.length >= 3 ||
                  'Your name has to be longer than 3 characters',
              ]"
              label="Full name"
            >
            </q-input>
            <!-- email -->
            <q-input
              color="grey-3"
              label-color="grey-5"
              lazy-rules
              dense
              type="email"
              v-model="register.email"
              :rules="[
                (val) => validateEmail(val) || 'Please insert a valid email',
              ]"
              label="Email"
            >
            </q-input>
            <!-- password -->
            <q-input
              color="grey-3"
              label-color="grey-5"
              lazy-rules
              dense
              type="password"
              v-model="register.password"
              :rules="[
                (val) =>
                  val.length >= 6 || 'Please enter more than 6 characters',
              ]"
              label="Password"
            >
            </q-input>
            <!-- confirm -->
            <q-input
              color="grey-3"
              label-color="grey-5"
              lazy-rules
              dense
              type="password"
              v-model="register.confirmPassword"
              :rules="[
                (val) =>
                  val.length >= 6 || 'Please enter more than 6 characters',
              ]"
              label="Confirm password"
            >
            </q-input>
            <q-btn
              label="Register"
              color="green-3"
              :disable="registerButtonActive"
              type="submit"
              class="col full-width"
              @keyup.enter.prevent="registerUser"
              @click="registerUser"
            />
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
      <!-- OR -->
      <div
        class="row text-center items-center justify-between"
        style="max-width: 240px; margin: auto"
      >
        <q-separator size="1px" style="width: 35%" color="grey-5" />
        <div class="text-weight-regular text-grey-6" style="width: 10%">OR</div>
        <q-separator size="1px" style="width: 35%" color="grey-5" />
      </div>
      <!-- Log in with Google -->
      <div class="q-pa-md">
        <q-btn
          label="Use your Google Account"
          color="red-3"
          type="submit"
          class="col full-width"
        />
      </div>
      <q-inner-loading :showing="visible">
        <q-spinner-ios size="50px" color="grey-6" />
      </q-inner-loading>
    </div>
    <!-- Footer -->
    <q-separator
      color="grey-5"
      size="1px"
      style="min-width: 245px"
      class="q-mb-md"
    ></q-separator>
    <div class="text-body1 text-grey-5">© 2021 Toneygram</div>
  </div>
</template>

<script>
import { Notify, LoadingBar } from "quasar";
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
export default {
  data() {
    return {
      visible: false,
      tab: "login",
      login: {
        email: "",
        password: "",
      },
      register: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
      },
      loginButtonActive: false,
      registerButtonActive: false,
    };
  },
  methods: {
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    registerUser() {
      if (this.register.password === this.register.confirmPassword) {
        this.registerButtonActive = true;
        this.visible = true;
        firebaseAuth
          .createUserWithEmailAndPassword(
            this.register.email,
            this.register.password
          )
          .then((registeredUser) => {
            this.visible = false;
            // Setting the user in the Database
            const actualUserId = firebaseAuth.currentUser.uid;
            const usersRef = firebaseDb.ref(
              "toneygram/users/" + actualUserId + "/userInformation"
            );
            registeredUser.user
              .updateProfile({
                displayName: this.register.username.toLowerCase(),
                photoURL: "https://i.ibb.co/hyqwWJD/default.png",
              })
              .then(() => {
                usersRef.set({
                  img: registeredUser.user.photoURL,
                  name: registeredUser.user.displayName.toLowerCase(),
                  id: registeredUser.user.uid,
                  fullname: this.register.fullName,
                });
              });
            LoadingBar.start();
            setTimeout(() => {
              // Notification
              Notify.create({
                avatar: firebaseAuth.currentUser.photoURL,
                message: `Welcome, ${firebaseAuth.currentUser.displayName}`,
                color: "positive",
              });
              this.$router.push({ name: "Home" });
            }, 1000);
          })
          .catch((error) => {
            this.registerButtonActive = false;
            this.visible = false;
            Notify.create({
              message: error.message,
              color: "negative",
            });
          });
      } else if (this.register.password !== this.register.confirmPassword) {
        Notify.create({
          message: "Passwords does not match",
          color: "negative",
        });
      }
    },
    logInUser() {
      this.loginButtonActive = true;
      this.visible = true;
      firebaseAuth
        .signInWithEmailAndPassword(this.login.email, this.login.password)
        .then((userCredentials) => {
          this.visible = false;
          LoadingBar.start();
          setTimeout(() => {
            this.$router.push({ name: "Home" });
            Notify.create({
              avatar: userCredentials.user.photoURL,
              message: `Welcome, ${userCredentials.user.displayName}`,
              color: "positive",
            });
          }, 1000);
        })
        .catch((error) => {
          this.loginButtonActive = false;
          this.visible = false;
          Notify.create({
            message: error.message,
            color: "negative",
          });
        });
    },
  },
};
</script>
<style lang="scss">
//iPhone
@media (max-width: 480px) {
  .authBase {
    align-items: center;
  }
  .imgLogoBase {
    width: 10rem;
    height: 10rem;
  }
  .imgLogoIcon {
    width: 100%;
    height: 100%;
  }
  .formBase {
    min-width: 280px;
  }
}

//Tablet
@media (min-width: 480px) {
  .authBase {
    align-items: center;
  }
  .imgLogoBase {
    width: 10rem;
    height: 10rem;
  }
  .imgLogoIcon {
    width: 100%;
    height: 100%;
  }
  .formBase {
    min-width: 280px;
  }
}

//Desktop
@media (min-width: 768px) {
  .authBase {
    align-items: center;
  }
  .imgLogoBase {
    width: 10rem;
    height: 10rem;
  }
  .imgLogoIcon {
    width: 100%;
    height: 100%;
  }
  .formBase {
    max-width: 280px;
  }
}
</style>
