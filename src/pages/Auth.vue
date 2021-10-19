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
          <q-form @submit="logInAction">
            <q-input
              color="grey-3"
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
            />
          </q-form>
        </q-tab-panel>
        <!-- Register -->
        <q-tab-panel name="register" class="q-py-none q-pb-md">
          <q-form @submit="registerAction">
            <!-- username -->
            <q-input
              color="grey-3"
              label-color="grey-5"
              dense
              lazy-rules
              type="username"
              v-model="register.username"
              :rules="[
                (val) =>
                  val.length >= 3 ||
                  'Your username has to be longer than 3 characters',
              ]"
              label="Username"
            >
            </q-input>
            <!-- email -->
            <q-input
              color="grey-3"
              label-color="grey-5"
              lazy-rules
              dense
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
              type="submit"
              class="col full-width"
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
export default {
  data() {
    return {
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
      },
    };
  },
  methods: {
    validateEmail(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    registerAction() {
      this.registerUser(this.register);
    },
    logInAction() {
      this.logInUser(this.login);
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
