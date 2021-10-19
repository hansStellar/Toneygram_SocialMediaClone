<template>
  <div class="items-center userPageBase">
    <!-- My Card -->
    <div class="row flex myCardBaseUser items-center justify-between q-pa-md">
      <!-- Img -->
      <q-avatar class="imgBaseUser shadow-5">
        <img :src="userInfomation.img" class="imageMyCard" />
      </q-avatar>
      <!-- Info Upper -->
      <div class="column">
        <!-- Username -->
        <div class="userNameUpperBase items-center">
          <div class="text-weight-thin text-h4 q-mb-sm usernameDesktop">
            {{ userInfomation.name }}
          </div>
          <q-btn
            class="full-width showButtonMobile"
            dense
            label="Edit Profile"
          />
          <q-btn
            class="full-width showButtonDesktop"
            dense
            color="grey-5"
            flat
            icon="settings"
            style="max-height: 2rem"
          />
        </div>
        <!-- Followers, following and posts -->
        <div class="row justify-between q-py-md text-center followers">
          <!-- Post -->
          <div class="row">
            <div class="text-weight-medium q-mr-sm">5</div>
            <div class="text-black text-weight-light">posts</div>
          </div>
          <!-- Following -->
          <div class="row">
            <div class="text-weight-medium q-mr-sm">34</div>
            <div class="text-black text-weight-light">following</div>
          </div>
          <!-- Followers -->
          <div class="row">
            <div class="text-weight-medium q-mr-sm">1023</div>
            <div class="text-black text-weight-light">followers</div>
          </div>
        </div>
        <!-- Resume -->
        <div class="resumeBaseUpper">
          <!-- Name -->
          <div class="text-weight-medium">Hans Chris</div>
          <!-- Description -->
          <div>Reformado por el Cristo.</div>
          <!-- Pagina web -->
          <div>hanswindu.github.io/ijs-mp</div>
        </div>
      </div>
    </div>
    <!-- Resume -->
    <div class="q-pa-md resumeBase">
      <!-- Name -->
      <div class="text-weight-medium">Hans Chris</div>
      <!-- Description -->
      <div>Reformado por el Cristo.</div>
      <!-- Pagina web -->
      <div>hanswindu.github.io/ijs-mp</div>
    </div>
    <!-- Post, following and followers -->
    <div class="followersPostBase">
      <q-separator color="grey-4" size="1px" />
      <div class="row justify-between q-px-lg q-py-sm text-center">
        <!-- Post -->
        <div>
          <div class="text-weight-medium">5</div>
          <div class="text-grey">posts</div>
        </div>
        <!-- Following -->
        <div>
          <div class="text-weight-medium">34</div>
          <div class="text-grey">following</div>
        </div>
        <!-- Followers -->
        <div>
          <div class="text-weight-medium">1023</div>
          <div class="text-grey">followers</div>
        </div>
      </div>
      <q-separator color="grey-4" size="1px" />
    </div>
    <!-- Bar Desktop -->
    <q-separator size="1px" color="grey-4" class="q-mt-lg barOnlyDesktop" />
  </div>
</template>
<script>
import { firebaseAuth, firebaseDb } from "src/boot/firebase";
export default {
  data() {
    return {
      userInfomation: {},
    };
  },
  beforeCreate() {
    let currentUserId = this.$route.params.userId;
    let currentUserInformationRef = firebaseDb.ref(
      "toneygram/users/" + currentUserId
    );
    currentUserInformationRef.once("value", (userInPage) => {
      let userInformation = userInPage.val();
      this.userInfomation = {
        id: userInformation.userInformation.id,
        img: userInformation.userInformation.img,
        name: userInformation.userInformation.name,
      };
    });
  },
};
</script>
<style lang="scss">
.userPageBase {
  max-width: 970px;
  margin: auto;
}
//iPhone
@media (max-width: 480px) {
  .imgBaseUser {
    height: 77px;
    width: 77px;
  }
  .showButtonMobile {
    display: block;
  }
  .showButtonDesktop {
    display: none;
  }
  .followers {
    display: none;
  }
  .resumeBaseUpper {
    display: none;
  }
  .barOnlyDesktop {
    display: none;
  }
}
//Tablet
@media (min-width: 480px) {
  .barOnlyDesktop {
    display: none;
  }
  .imgBaseUser {
    height: 150px;
    width: 150px;
    margin-right: 4rem;
  }
  .myCardBaseUser {
    justify-content: start;
  }
  .resumeBaseUpper {
    display: none;
  }
  .showButtonMobile {
    display: block;
  }
  .showButtonDesktop {
    display: none;
  }
  .followers {
    display: none;
  }
}
//Desktop
@media (min-width: 768px) {
  .barOnlyDesktop {
    display: block;
  }
  .myCardBaseUser {
    justify-content: start;
    padding-left: 5.5rem;
  }
  .imgBaseUser {
    height: 150px;
    width: 150px;
    margin-right: 7rem;
  }
  .userNameUpperBase {
    display: flex;
  }
  .usernameDesktop {
    margin-right: 1rem;
  }
  .resumeBase {
    display: none;
  }
  .resumeBaseUpper {
    display: block;
  }
  .showButtonMobile {
    display: none;
  }
  .showButtonDesktop {
    display: block;
  }
  .followers {
    display: flex;
  }
  .followersPostBase {
    display: none;
  }
  .userPageBase {
    padding: 1rem 0;
    font-size: 0.8rem;
  }
}
</style>
