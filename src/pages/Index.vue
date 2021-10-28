<template>
  <!-- iPhone and Tablet -->
  <div class="flex flex-center bg-grey-2 homeBase mobileBase">
    <!-- Top -->
    <q-tabs
      v-model="tab"
      align="justify"
      dense
      class="bg-white text-black shadow-2"
      v-if="postsToShow.length || postsExplore.length"
    >
      <q-tab name="feed" icon="home" @click="goToTop" />
      <q-tab name="explore" icon="explore" @click="goToTop" />
    </q-tabs>
    <q-skeleton height="2.2rem" width="100%" v-else />

    <!-- Bottom -->
    <q-tab-panels v-model="tab" animated>
      <!-- Feed -->
      <q-tab-panel name="feed" class="bg-grey-2 no-padding">
        <div v-if="postsFollowingStatus">
          <div
            class="cardBase bg-white shadow-2"
            v-for="(post, index) in postsToShow"
            :key="index"
          >
            <!-- Header -->
            <div>
              <q-banner rounded class="bg-white">
                <template v-slot:avatar>
                  <q-avatar
                    class="shadow-2"
                    size="2rem"
                    v-if="postsFollowingStatus"
                  >
                    <img :src="post.userInfo.userImg" />
                  </q-avatar>
                  <q-skeleton type="circle" size="50px" v-else />
                </template>
                <span
                  class="text-weight-bold cursor-pointer"
                  @click="
                    this.$router.push({
                      name: 'User',
                      params: {
                        userId: post.userInfo.userId,
                      },
                    })
                  "
                  v-if="postsFollowingStatus"
                  >{{ post.userInfo.userName }}</span
                >
                <q-skeleton width="150px" v-else />
              </q-banner>
            </div>
            <q-separator color="grey-5" />
            <!-- Image/Caroussel -->
            <q-carousel
              animated
              v-model="post.scrollIndex"
              arrows
              navigation
              infinite
              v-if="postsFollowingStatus"
              style="height: 30rem"
            >
              <q-carousel-slide
                v-for="(image, index) in post.imagesUploaded"
                :key="index"
                :name="index"
                :img-src="image"
              />
            </q-carousel>
            <q-skeleton height="21rem" v-else />
            <q-separator color="grey-5" />
            <!-- Like and Comment -->
            <div class="q-my-sm">
              <q-btn
                dense
                round
                flat
                @click="unlikePost(post.idPost, post.userInfo.userId)"
                v-if="
                  post.likes &&
                  actualUserInformation.userInformation.id in post.likes
                "
                icon="favorite"
                color="red"
              />
              <q-btn
                dense
                round
                flat
                v-else
                icon="favorite_border"
                @click="likePost(post.idPost, post.userInfo.userId)"
              />
              <q-btn dense round flat icon="far fa-comment" />
            </div>
            <!-- Likes -->
            <div
              class="q-mb-sm q-mx-sm text-weight-bold"
              v-if="postsFollowingStatus"
            >
              <div v-if="post.likes">
                {{ Object.values(post.likes).length }} likes
              </div>
              <div v-else>0 likes</div>
            </div>
            <q-skeleton width="150px" class="q-ml-sm q-mb-md" v-else />
            <!-- Description -->
            <div class="q-mb-sm q-mx-sm" v-if="postsFollowingStatus">
              <span
                class="text-blue-grey-10 text-weight-bold cursor-pointer"
                @click="
                  this.$router.push({
                    name: 'User',
                    params: {
                      userId: post.userInfo.userId,
                    },
                  })
                "
                >{{ post.userInfo.userName }}</span
              >
              {{ post.description }}
            </div>
            <q-skeleton width="300px" class="q-ml-sm" v-else />
            <q-separator color="grey-4" class="q-mb-sm" />
            <!-- Comments -->
            <div
              v-if="postsFollowingStatus"
              class="q-mb-sm q-mx-sm"
              style="max-height: 7rem; overflow: auto"
            >
              <div v-for="(message, index) in post.messages" :key="index">
                <span
                  class="text-blue-grey-10 text-weight-bold cursor-pointer"
                  @click="
                    this.$router.push({
                      name: 'User',
                      params: {
                        userId: message.idUser,
                      },
                    })
                  "
                  >{{ message.userName }}</span
                >
                {{ message.message }}
              </div>
            </div>
            <q-skeleton width="190px" class="q-ml-sm q-mt-md" v-else />
            <q-separator color="grey-4" class="q-mb-sm" />
            <!-- Create Comment -->
            <div class="bg-white full-width q-px-sm">
              <q-input
                color="grey-6"
                v-model="textMessage"
                label="Add a comment ..."
                autofocus
                autocomplete="off"
                borderless
              >
                <template v-slot:append>
                  <q-btn
                    label="POST"
                    dense
                    flat
                    color="primary"
                    @click="sendText(post.userInfo.userId, post.idPost)"
                    :disable="textMessage.length <= 0"
                  />
                </template>
              </q-input>
            </div>
            <!-- Date -->
            <div
              class="q-mx-sm text-grey text-overline"
              v-if="postsFollowingStatus"
            >
              {{ post.dateOfPost }}
            </div>
          </div>
        </div>
        <!-- Skeleton -->
        <div v-else>
          <div
            class="cardBase shadow-2 q-pb-md"
            v-for="(skeleton, index) in skeletonTimes"
            :key="index"
          >
            <!-- Header -->
            <div>
              <q-banner rounded class="bg-white">
                <template v-slot:avatar>
                  <q-skeleton type="circle" size="50px" />
                </template>

                <q-skeleton width="150px" />
              </q-banner>
            </div>
            <q-separator color="grey-5" />
            <!-- Image/Caroussel -->

            <q-skeleton height="21rem" />
            <q-separator color="grey-5" />
            <!-- Like and Comment -->
            <div class="q-my-sm">
              <q-btn dense round flat icon="favorite_border" />
              <q-btn dense round flat icon="far fa-comment" />
            </div>
            <!-- Likes -->

            <q-skeleton width="150px" class="q-ml-sm q-mb-md" />
            <!-- Description -->

            <q-skeleton width="300px" class="q-ml-sm" />
            <!-- Comments -->

            <q-skeleton width="190px" class="q-ml-sm q-mt-md" />
          </div>
        </div>
        <!-- No activity -->
        <div
          class="full-width text-center text-grey-5"
          v-if="!postsFollowingStatus || postsToShow.length === 0"
        >
          <div class="text-center text-h4 q-mb-lg">
            there is no current activity
          </div>
          <q-icon size="2rem" name="sentiment_dissatisfied" />
        </div>
      </q-tab-panel>

      <!-- Explore -->
      <q-tab-panel name="explore" class="bg-grey-2 no-padding">
        <div v-if="postsFollowingStatus">
          <div
            class="cardBase shadow-2 bg-white"
            v-for="(post, index) in postsExplore"
            :key="index"
          >
            <!-- Header -->
            <div>
              <q-banner rounded class="bg-white">
                <template v-slot:avatar>
                  <q-avatar
                    class="shadow-2"
                    size="2rem"
                    v-if="postsFollowingStatus"
                  >
                    <img :src="post.userInfo.userImg" />
                  </q-avatar>
                  <q-skeleton type="circle" size="50px" v-else />
                </template>
                <span
                  class="text-weight-bold cursor-pointer"
                  @click="
                    this.$router.push({
                      name: 'User',
                      params: {
                        userId: post.userInfo.userId,
                      },
                    })
                  "
                  v-if="postsFollowingStatus"
                  >{{ post.userInfo.userName }}</span
                >
                <q-skeleton width="150px" v-else />
              </q-banner>
            </div>
            <q-separator color="grey-5" />
            <!-- Image/Caroussel -->
            <q-carousel
              animated
              v-model="post.scrollIndex"
              arrows
              navigation
              infinite
              v-if="postsFollowingStatus"
              style="height: 30rem"
            >
              <q-carousel-slide
                v-for="(image, index) in post.imagesUploaded"
                :key="index"
                :name="index"
                :img-src="image"
              />
            </q-carousel>
            <q-skeleton height="21rem" v-else />
            <q-separator color="grey-5" />
            <!-- Like and Comment -->
            <div class="q-my-sm">
              <q-btn
                dense
                round
                flat
                @click="unlikePost(post.idPost, post.userInfo.userId)"
                v-if="
                  post.likes &&
                  actualUserInformation.userInformation.id in post.likes
                "
                icon="favorite"
                color="red"
              />
              <q-btn
                dense
                round
                flat
                v-else
                icon="favorite_border"
                @click="likePost(post.idPost, post.userInfo.userId)"
              />
              <q-btn dense round flat icon="far fa-comment" />
            </div>
            <!-- Likes -->
            <div
              class="q-mb-sm q-mx-sm text-weight-bold"
              v-if="postsFollowingStatus"
            >
              <div v-if="post.likes">
                {{ Object.values(post.likes).length }} likes
              </div>
              <div v-else>0 likes</div>
            </div>
            <q-skeleton width="150px" class="q-ml-sm q-mb-md" v-else />
            <!-- Description -->
            <div class="q-mb-sm q-mx-sm" v-if="postsFollowingStatus">
              <span
                class="text-blue-grey-10 text-weight-bold cursor-pointer"
                @click="
                  this.$router.push({
                    name: 'User',
                    params: {
                      userId: post.userInfo.userId,
                    },
                  })
                "
                >{{ post.userInfo.userName }}</span
              >
              {{ post.description }}
            </div>
            <q-skeleton width="300px" class="q-ml-sm" v-else />
            <q-separator color="grey-4" class="q-mb-sm" />
            <!-- Comments -->
            <div
              v-if="postsFollowingStatus"
              class="q-mb-sm q-mx-sm"
              style="max-height: 7rem; overflow: auto"
            >
              <div v-for="(message, index) in post.messages" :key="index">
                <span
                  class="text-blue-grey-10 text-weight-bold cursor-pointer"
                  @click="
                    this.$router.push({
                      name: 'User',
                      params: {
                        userId: message.idUser,
                      },
                    })
                  "
                  >{{ message.userName }}</span
                >
                {{ message.message }}
              </div>
            </div>
            <q-skeleton width="190px" class="q-ml-sm q-mt-md" v-else />
            <q-separator color="grey-4" class="q-mb-sm" />
            <!-- Create Comment -->
            <div class="bg-white full-width q-px-sm">
              <q-input
                color="grey-6"
                v-model="textMessage"
                label="Add a comment ..."
                autofocus
                autocomplete="off"
                borderless
              >
                <template v-slot:append>
                  <q-btn
                    label="POST"
                    dense
                    flat
                    color="primary"
                    @click="sendText(post.userInfo.userId, post.idPost)"
                    :disable="textMessage.length <= 0"
                  />
                </template>
              </q-input>
            </div>
            <!-- Date -->
            <div
              class="q-mx-sm text-grey text-overline"
              v-if="postsFollowingStatus"
            >
              {{ post.dateOfPost }}
            </div>
          </div>
        </div>
        <!-- Skeleton -->
        <div v-else>
          <div
            class="cardBase shadow-2"
            v-for="(skeleton, index) in skeletonTimes"
            :key="index"
          >
            <!-- Header -->
            <div>
              <q-banner rounded class="bg-white">
                <template v-slot:avatar>
                  <q-skeleton type="circle" size="50px" />
                </template>

                <q-skeleton width="150px" />
              </q-banner>
            </div>
            <q-separator color="grey-5" />
            <!-- Image/Caroussel -->

            <q-skeleton height="21rem" />
            <q-separator color="grey-5" />
            <!-- Like and Comment -->
            <div class="q-my-sm">
              <q-btn dense round flat icon="favorite_border" />
              <q-btn dense round flat icon="far fa-comment" />
            </div>
            <!-- Likes -->

            <q-skeleton width="150px" class="q-ml-sm q-mb-md" />
            <!-- Description -->

            <q-skeleton width="300px" class="q-ml-sm" />
            <!-- Comments -->

            <q-skeleton width="190px" class="q-ml-sm q-mt-md" />
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
  <!-- Desktop New One -->
  <div class="flex flex-center bg-grey-2 homeBase q-gutter-xl desktopBase">
    <!-- Cards -->
    <div>
      <!-- Top -->
      <q-tabs
        v-model="tab"
        align="justify"
        dense
        narrow-indicator
        class="bg-white text-black shadow-2 q-mt-md q-mb-lg"
        v-if="postsToShow.length || postsExplore.length"
        style="width: 42rem"
      >
        <q-tab name="feed" icon="home" @click="goToTop" />
        <q-tab name="explore" icon="explore" @click="goToTop" />
      </q-tabs>
      <q-skeleton
        height="2.4rem"
        width="42rem"
        class="q-mt-md q-mb-lg"
        v-else
      />
      <!-- Bottom -->
      <q-tab-panels v-model="tab" animated>
        <!-- Feed -->
        <q-tab-panel name="feed" class="bg-grey-2 no-padding no-margin">
          <div v-if="postsFollowingStatus">
            <div
              class="cardBase bg-white q-mb-xl"
              v-for="(post, index) in postsToShow"
              :key="index"
            >
              <!-- Header -->
              <div>
                <q-banner rounded class="bg-white items-center">
                  <template v-slot:avatar>
                    <q-avatar
                      size="2rem"
                      class="shadow-2"
                      v-if="postsFollowingStatus"
                    >
                      <img :src="post.userInfo.userImg" />
                    </q-avatar>
                    <q-skeleton type="circle" width="1rem" v-else />
                  </template>
                  <span
                    class="text-weight-bold cursor-pointer"
                    @click="
                      this.$router.push({
                        name: 'User',
                        params: {
                          userId: post.userInfo.userId,
                        },
                      })
                    "
                    v-if="postsFollowingStatus"
                    >{{ post.userInfo.userName }}</span
                  >
                  <q-skeleton width="2rem" v-else />
                </q-banner>
              </div>
              <q-separator color="grey-5" />
              <!-- Image/Caroussel -->
              <q-carousel
                animated
                v-model="post.scrollIndex"
                arrows
                navigation
                infinite
                v-if="postsFollowingStatus"
                style="height: 30rem"
              >
                <q-carousel-slide
                  v-for="(image, index) in post.imagesUploaded"
                  :key="index"
                  :name="index"
                  :img-src="image"
                />
              </q-carousel>
              <q-skeleton height="21rem" v-else />
              <q-separator color="grey-5" />
              <!-- Like and Comment -->
              <div class="q-my-sm">
                <q-btn
                  dense
                  round
                  flat
                  @click="unlikePost(post.idPost, post.userInfo.userId)"
                  v-if="
                    post.likes &&
                    actualUserInformation.userInformation.id in post.likes
                  "
                  icon="favorite"
                  color="red"
                />
                <q-btn
                  dense
                  round
                  flat
                  v-else
                  icon="favorite_border"
                  @click="likePost(post.idPost, post.userInfo.userId)"
                />
                <q-btn dense round flat icon="far fa-comment" />
              </div>
              <!-- Likes -->
              <div
                class="q-mb-sm q-mx-sm text-weight-bold"
                v-if="postsFollowingStatus"
              >
                <div v-if="post.likes">
                  {{ Object.values(post.likes).length }} likes
                </div>
                <div v-else>0 likes</div>
              </div>
              <q-skeleton width="150px" class="q-ml-sm q-mb-md" v-else />
              <!-- Description -->
              <div class="q-mb-sm q-mx-sm" v-if="postsFollowingStatus">
                <span
                  class="text-blue-grey-10 text-weight-bold cursor-pointer"
                  @click="
                    this.$router.push({
                      name: 'User',
                      params: {
                        userId: post.userInfo.userId,
                      },
                    })
                  "
                  >{{ post.userInfo.userName }}</span
                >
                {{ post.description }}
              </div>
              <q-skeleton width="300px" class="q-ml-sm" v-else />
              <q-separator color="grey-4" class="q-mb-sm" />
              <!-- Comments -->
              <div
                v-if="postsFollowingStatus"
                class="q-mb-sm q-mx-sm"
                style="max-height: 7rem; overflow: auto"
              >
                <div v-for="(message, index) in post.messages" :key="index">
                  <span
                    class="text-blue-grey-10 text-weight-bold cursor-pointer"
                    @click="
                      this.$router.push({
                        name: 'User',
                        params: {
                          userId: message.idUser,
                        },
                      })
                    "
                    >{{ message.userName }}</span
                  >
                  {{ message.message }}
                </div>
              </div>
              <q-skeleton width="190px" class="q-ml-sm q-mt-md" v-else />
              <q-separator color="grey-4" class="q-mb-sm" />
              <!-- Create Comment -->
              <div class="bg-white full-width q-px-sm">
                <q-input
                  color="grey-6"
                  v-model="textMessage"
                  label="Add a comment ..."
                  autofocus
                  autocomplete="off"
                  borderless
                >
                  <template v-slot:append>
                    <q-btn
                      label="POST"
                      dense
                      flat
                      color="primary"
                      @click="sendText(post.userInfo.userId, post.idPost)"
                      :disable="textMessage.length <= 0"
                    />
                  </template>
                </q-input>
              </div>
              <!-- Date -->
              <div
                class="q-mx-sm text-grey text-overline"
                v-if="postsFollowingStatus"
              >
                {{ post.dateOfPost }}
              </div>
            </div>
          </div>
          <!-- Skeleton -->
          <div v-else>
            <div
              class="cardBase shadow-2 q-mb-xl q-pb-md"
              v-for="(skeleton, index) in skeletonTimes"
              :key="index"
            >
              <!-- Header -->
              <div>
                <q-banner rounded class="bg-white">
                  <template v-slot:avatar>
                    <q-skeleton type="circle" size="50px" />
                  </template>

                  <q-skeleton width="150px" />
                </q-banner>
              </div>
              <q-separator color="grey-5" />
              <!-- Image/Caroussel -->

              <q-skeleton height="21rem" />
              <q-separator color="grey-5" />
              <!-- Like and Comment -->
              <div class="q-my-sm">
                <q-btn dense round flat icon="favorite_border" />
                <q-btn dense round flat icon="far fa-comment" />
              </div>
              <!-- Likes -->

              <q-skeleton width="150px" class="q-ml-sm q-mb-md" />
              <!-- Description -->

              <q-skeleton width="300px" class="q-ml-sm" />
              <!-- Comments -->

              <q-skeleton width="190px" class="q-ml-sm q-mt-md" />
            </div>
          </div>
          <!-- No activity -->
          <div
            class="full-width text-center text-grey-5"
            v-if="!postsFollowingStatus || postsToShow.length === 0"
          >
            <div class="text-center text-h4 q-mb-lg">
              there is no current activity
            </div>
            <q-icon size="2rem" name="sentiment_dissatisfied" />
          </div>
        </q-tab-panel>

        <!-- Explore -->
        <q-tab-panel name="explore" class="bg-grey-2 no-padding no-margin">
          <div v-if="postsFollowingStatus">
            <div
              class="cardBase bg-white q-mb-xl"
              v-for="(post, index) in postsExplore"
              :key="index"
            >
              <!-- Header -->
              <div>
                <q-banner rounded class="bg-white">
                  <template v-slot:avatar>
                    <q-avatar
                      class="shadow-2"
                      size="2rem"
                      v-if="postsFollowingStatus"
                    >
                      <img :src="post.userInfo.userImg" />
                    </q-avatar>
                    <q-skeleton type="circle" size="20px" v-else />
                  </template>
                  <span
                    class="text-weight-bold cursor-pointer"
                    @click="
                      this.$router.push({
                        name: 'User',
                        params: {
                          userId: post.userInfo.userId,
                        },
                      })
                    "
                    v-if="postsFollowingStatus"
                    >{{ post.userInfo.userName }}</span
                  >
                  <q-skeleton width="150px" v-else />
                </q-banner>
              </div>
              <q-separator color="grey-5" />
              <!-- Image/Caroussel -->
              <q-carousel
                animated
                v-model="post.scrollIndex"
                arrows
                navigation
                infinite
                v-if="postsFollowingStatus"
                style="height: 30rem"
              >
                <q-carousel-slide
                  v-for="(image, index) in post.imagesUploaded"
                  :key="index"
                  :name="index"
                  :img-src="image"
                />
              </q-carousel>
              <q-skeleton height="21rem" v-else />
              <q-separator color="grey-5" />
              <!-- Like and Comment -->
              <div class="q-my-sm">
                <q-btn
                  dense
                  round
                  flat
                  @click="unlikePost(post.idPost, post.userInfo.userId)"
                  v-if="
                    post.likes &&
                    actualUserInformation.userInformation.id in post.likes
                  "
                  icon="favorite"
                  color="red"
                />
                <q-btn
                  dense
                  round
                  flat
                  v-else
                  icon="favorite_border"
                  @click="likePost(post.idPost, post.userInfo.userId)"
                />
                <q-btn dense round flat icon="far fa-comment" />
              </div>
              <!-- Likes -->
              <div
                class="q-mb-sm q-mx-sm text-weight-bold"
                v-if="postsFollowingStatus"
              >
                <div v-if="post.likes">
                  {{ Object.values(post.likes).length }} likes
                </div>
                <div v-else>0 likes</div>
              </div>
              <q-skeleton width="150px" class="q-ml-sm q-mb-md" v-else />
              <!-- Description -->
              <div class="q-mb-sm q-mx-sm" v-if="postsFollowingStatus">
                <span
                  class="text-blue-grey-10 text-weight-bold cursor-pointer"
                  @click="
                    this.$router.push({
                      name: 'User',
                      params: {
                        userId: post.userInfo.userId,
                      },
                    })
                  "
                  >{{ post.userInfo.userName }}</span
                >
                {{ post.description }}
              </div>
              <q-skeleton width="300px" class="q-ml-sm" v-else />
              <q-separator color="grey-4" class="q-mb-sm" />
              <!-- Comments -->
              <div
                v-if="postsFollowingStatus"
                class="q-mb-sm q-mx-sm"
                style="max-height: 7rem; overflow: auto"
              >
                <div v-for="(message, index) in post.messages" :key="index">
                  <span
                    class="text-blue-grey-10 text-weight-bold cursor-pointer"
                    @click="
                      this.$router.push({
                        name: 'User',
                        params: {
                          userId: message.idUser,
                        },
                      })
                    "
                    >{{ message.userName }}</span
                  >
                  {{ message.message }}
                </div>
              </div>
              <q-skeleton width="190px" class="q-ml-sm q-mt-md" v-else />
              <q-separator color="grey-4" class="q-mb-sm" />
              <!-- Create Comment -->
              <div class="bg-white full-width q-px-sm">
                <q-input
                  color="grey-6"
                  v-model="textMessage"
                  label="Add a comment ..."
                  autofocus
                  autocomplete="off"
                  borderless
                >
                  <template v-slot:append>
                    <q-btn
                      label="POST"
                      dense
                      flat
                      color="primary"
                      @click="sendText(post.userInfo.userId, post.idPost)"
                      :disable="textMessage.length <= 0"
                    />
                  </template>
                </q-input>
              </div>
              <!-- Date -->
              <div
                class="q-mx-sm text-grey text-overline"
                v-if="postsFollowingStatus"
              >
                {{ post.dateOfPost }}
              </div>
            </div>
          </div>
          <!-- Skeleton -->
          <div v-else>
            <div
              class="cardBase shadow-2 q-mb-xl q-pb-md"
              v-for="(skeleton, index) in skeletonTimes"
              :key="index"
            >
              <!-- Header -->
              <div>
                <q-banner rounded class="bg-white">
                  <template v-slot:avatar>
                    <q-skeleton type="circle" size="50px" />
                  </template>

                  <q-skeleton width="150px" />
                </q-banner>
              </div>
              <q-separator color="grey-5" />
              <!-- Image/Caroussel -->

              <q-skeleton height="21rem" />
              <q-separator color="grey-5" />
              <!-- Like and Comment -->
              <div class="q-my-sm">
                <q-btn dense round flat icon="favorite_border" />
                <q-btn dense round flat icon="far fa-comment" />
              </div>
              <!-- Likes -->

              <q-skeleton width="150px" class="q-ml-sm q-mb-md" />
              <!-- Description -->

              <q-skeleton width="300px" class="q-ml-sm" />
              <!-- Comments -->

              <q-skeleton width="190px" class="q-ml-sm q-mt-md" />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <!-- New Side Desktop -->
    <div class="desktopBaseNew" style="width: 16rem">
      <div class="q-pt-sm fixed">
        <!-- My Card -->
        <div class="row flex myCardBase items-center justify-between q-mb-lg">
          <div class="row items-center">
            <!-- Img -->
            <q-avatar class="imgBase shadow-5">
              <img
                @click="
                  this.$router.push({
                    name: 'User',
                    params: {
                      userId: actualUserInformation.userInformation.id,
                    },
                  })
                "
                v-if="userInformationStatus"
                :src="actualUserInformation.userInformation.img"
                class="imageMyCard cursor-pointer"
              />
              <q-skeleton v-else type="circle" size="100%" />
            </q-avatar>
            <!-- Name -->
            <div class="q-pl-md">
              <!-- Username -->
              <div
                class="text-weight-bold text-blue-grey-10 cursor-pointer"
                @click="
                  this.$router.push({
                    name: 'User',
                    params: {
                      userId: actualUserInformation.userInformation.id,
                    },
                  })
                "
                v-if="userInformationStatus"
              >
                {{ actualUserInformation.userInformation.name }}
              </div>
              <q-skeleton v-else width="150px" />
              <!-- Name -->
              <div
                class="text-grey ellipsis"
                v-if="userInformationStatus"
                style="max-width: 7rem"
              >
                {{ actualUserInformation.userInformation.fullname }}
              </div>
              <q-skeleton v-else class="q-mt-sm" width="120px" />
            </div>
          </div>
          <!-- Log out button -->
          <q-btn
            icon="logout"
            color="cyan-2"
            round
            flat
            dense
            v-if="userInformationStatus"
          />
        </div>
        <!-- Suggested users -->
        <p class="text-grey text-weight-medium">Suggestions for you</p>
        <div class="col justify-between q-mb-lg" v-if="userInformationStatus">
          <!-- User -->
          <div
            class="row items-center q-mb-md justify-between"
            v-for="(user, index) in suggetionsUsers"
            :key="index"
          >
            <div class="row items-center">
              <!-- Img -->
              <q-avatar
                class="shadow-2 cursor-pointer"
                @click="
                  this.$router.push({
                    name: 'User',
                    params: {
                      userId: user.userInformation.id,
                    },
                  })
                "
              >
                <img :src="user.userInformation.img" />
              </q-avatar>

              <!-- Username -->
              <div>
                <div
                  class="q-pl-md text-weight-medium cursor-pointer"
                  @click="
                    this.$router.push({
                      name: 'User',
                      params: {
                        userId: user.userInformation.id,
                      },
                    })
                  "
                >
                  {{ user.userInformation.name }}
                </div>
                <div class="q-pl-md text-grey ellipsis" style="max-width: 8rem">
                  {{ user.userInformation.fullname }}
                </div>
              </div>
            </div>
            <q-btn
              label="Follow"
              dense
              flat
              v-if="!(user.userInformation.id in following)"
              @click="followUser(user.userInformation.id)"
              color="light-blue-3"
            />
            <q-btn
              label="Unfollow"
              dense
              flat
              v-else
              @click="unFollowUser(user.userInformation.id)"
              color="red-3"
            />
          </div>
          <!-- Follow button -->
        </div>
        <!-- Skeleton -->
        <div class="col justify-between q-mb-lg" v-else>
          <!-- User -->
          <div class="row items-center q-mb-md">
            <!-- Img -->
            <q-skeleton type="circle" size="3rem" class="q-mr-md" />
            <!-- Username -->
            <q-skeleton width="120px" />
          </div>
          <!-- Follow button -->
        </div>
        <!-- Footer -->
        <div class="text-grey-5 text-weight-light text-overline">
          © 2021 Toneygram
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { firebaseAuth, firebaseDb, firebaseStorage } from "src/boot/firebase";
import { mapGetters } from "vuex";
import { uid } from "quasar";
export default {
  name: "PageIndex",
  data() {
    return {
      skeletonTimes: [1, 2, 3],
      slide: 1,
      actualUserInformation: {},
      following: {},
      userInformationStatus: false,
      postsCurrentUserStatus: false,
      suggestedUsersStatus: false,
      postsFollowingStatus: false,
      postsToShow: [],
      postsExplore: [],
      suggetionsUsers: [],
      textMessage: "",
      tab: "feed",
    };
  },
  methods: {
    followUser(idUserAdd) {
      let userIdAuth = firebaseAuth.currentUser.uid;
      // Following Steps
      const currentUserRouteFollowing = firebaseDb.ref(
        "toneygram/users/" + idUserAdd
      );
      currentUserRouteFollowing.once("value", (userInfo) => {
        let user = userInfo.val();
        // Search for our route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + userIdAuth + "/following/" + idUserAdd
        );
        currentUserRoute.set(user.userInformation);
      });

      // Followers Steps
      const currentUserRouteFollowers = firebaseDb.ref(
        "toneygram/users/" + userIdAuth
      );
      currentUserRouteFollowers.once("value", (userInfo) => {
        let user = userInfo.val();
        // Search for his route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + idUserAdd + "/followers/" + userIdAuth
        );
        currentUserRoute.set(user.userInformation);
      });

      // Read from firebase database User Actual Page (Followers)
      const followerActRef = firebaseDb
        .ref("toneygram/users/" + userIdAuth + "/following/")
        .once("child_added", (newFollower) => {
          let follower = newFollower.val();
          this.following[newFollower.key] = follower;
        });
    },
    unFollowUser(idUserRemove) {
      let userIdAuth = firebaseAuth.currentUser.uid;
      // Following Steps
      const currentUserRouteFollowing = firebaseDb.ref(
        "toneygram/users/" + idUserRemove + "/userInformation/"
      );
      currentUserRouteFollowing.once("value", (userInfo) => {
        // Search for our route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + userIdAuth + "/following/" + idUserRemove
        );
        currentUserRoute.remove();
      });
      // Followers Steps
      const currentUserRouteFollowers = firebaseDb.ref(
        "toneygram/users/" + userIdAuth + "/userInformation/"
      );
      currentUserRouteFollowers.once("value", (userInfo) => {
        // Search for his route
        const currentUserRoute = firebaseDb.ref(
          "toneygram/users/" + idUserRemove + "/followers/" + userIdAuth
        );
        currentUserRoute.remove();
      });

      // Read from firebase database User Actual Page (Followers)
      const UnfollowerActRef = firebaseDb
        .ref("toneygram/users/" + userIdAuth + "/following/" + idUserRemove)
        .once("value", (newFollower) => {
          delete this.following[newFollower.key];
        });
    },
    likePost(idPost, idUser) {
      console.log(idPost);
      // User ref
      const postRef = firebaseDb.ref(
        "toneygram/users/" +
          idUser +
          "/posts/" +
          idPost +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      postRef.set(firebaseAuth.currentUser.uid);
      // Posts ref Global
      const postsGlobalRef = firebaseDb.ref(
        "toneygram/posts/" +
          idUser +
          "/" +
          idPost +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      postsGlobalRef.set(firebaseAuth.currentUser.uid);

      // Read from firebase database
      // Make a loop of this posts to show
      this.postsToShow.forEach((Post) => {
        if (Post.idPost === idPost) {
          const postLikeActRef = firebaseDb
            .ref(
              "toneygram/users/" +
                Post.userInfo.userId +
                "/posts/" +
                Post.idPost +
                "/likes/"
            )
            .once("value", (like) => {
              if (!Post.likes) {
                Post.likes = like.val();
              } else {
                Post.likes = like.val();
              }
            });
        }
      });
      this.postsExplore.forEach((Post) => {
        if (Post.idPost === idPost) {
          const postLikeActRef = firebaseDb
            .ref(
              "toneygram/users/" +
                Post.userInfo.userId +
                "/posts/" +
                Post.idPost +
                "/likes/"
            )
            .once("value", (like) => {
              if (!Post.likes) {
                Post.likes = like.val();
              } else {
                Post.likes = like.val();
              }
            });
        }
      });
    },
    unlikePost(idPost, idUser) {
      // User ref
      const postRef = firebaseDb.ref(
        "toneygram/users/" +
          idUser +
          "/posts/" +
          idPost +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      postRef.remove();
      // Posts ref Global
      const postGlobalRef = firebaseDb.ref(
        "toneygram/posts/" +
          idUser +
          "/" +
          idPost +
          "/likes/" +
          firebaseAuth.currentUser.uid
      );
      postGlobalRef.remove();

      this.postsToShow.forEach((Post) => {
        if (Post.idPost === idPost) {
          const postLikeActRef = firebaseDb
            .ref(
              "toneygram/users/" +
                Post.userInfo.userId +
                "/posts/" +
                Post.idPost +
                "/likes/"
            )
            .once("value", (like) => {
              Post.likes = like.val();
            });
        }
      });

      this.postsExplore.forEach((Post) => {
        if (Post.idPost === idPost) {
          const postLikeActRef = firebaseDb
            .ref(
              "toneygram/users/" +
                Post.userInfo.userId +
                "/posts/" +
                Post.idPost +
                "/likes/"
            )
            .once("value", (like) => {
              Post.likes = like.val();
            });
        }
      });
    },
    sendText(userId, postId) {
      let randomId = uid();
      // set on User private
      const MessagesBaseRef = firebaseDb
        .ref("toneygram/users/" + userId + "/posts/" + postId)
        .once("value", (Post) => {
          if (!Post.hasChild("messages")) {
            let allMesagesArray = [];
            let newMessage = {
              userName: firebaseAuth.currentUser.displayName,
              imgUser: firebaseAuth.currentUser.photoURL,
              idUser: firebaseAuth.currentUser.uid,
              message: this.textMessage,
              date: new Date().getTime(),
            };
            allMesagesArray.push(newMessage);

            const nuevoRef = firebaseDb.ref(
              "toneygram/users/" + userId + "/posts/" + postId + "/messages"
            );
            nuevoRef.set(allMesagesArray);
            this.postsToShow.forEach((post) => {
              if (post.idPost === Post.key) {
                post.messages = allMesagesArray;
              }
            });
            this.textMessage = "";
          } else {
            let allMesagesArray = [];
            const messagesRef = firebaseDb.ref(
              "toneygram/users/" + userId + "/posts/" + postId + "/messages"
            );
            messagesRef
              .once("child_added", (allMesages) => {
                allMesagesArray.push(allMesages.val());
              })
              .then(() => {
                let newMessage = {
                  userName: firebaseAuth.currentUser.displayName,
                  imgUser: firebaseAuth.currentUser.photoURL,
                  idUser: firebaseAuth.currentUser.uid,
                  message: this.textMessage,
                  date: new Date().getTime(),
                };
                allMesagesArray.push(newMessage);
                allMesagesArray.sort((a, b) => {
                  return a.date - b.date;
                });
                messagesRef.set(allMesagesArray);
                this.postsToShow.forEach((post) => {
                  if (post.idPost === Post.key) {
                    post.messages = allMesagesArray;
                  }
                });
                this.postsExplore.forEach((post) => {
                  if (post.idPost === Post.key) {
                    post.messages = allMesagesArray;
                  }
                });
                this.textMessage = "";
              });
          }
        });

      // set on global

      const MessageGlobalRef = firebaseDb
        .ref("toneygram/posts/" + userId + "/" + postId)
        .once("value", (Post) => {
          if (!Post.hasChild("messages")) {
            let allMesagesArray = [];
            let newMessage = {
              userName: firebaseAuth.currentUser.displayName,
              imgUser: firebaseAuth.currentUser.photoURL,
              idUser: firebaseAuth.currentUser.uid,
              message: this.textMessage,
              date: new Date().getTime(),
            };
            allMesagesArray.push(newMessage);

            const nuevoRef = firebaseDb.ref(
              "toneygram/posts/" + userId + "/" + postId + "/messages"
            );
            nuevoRef.set(allMesagesArray);
          } else {
            let allMesagesArray = [];
            const messagesRef = firebaseDb.ref(
              "toneygram/posts/" + userId + "/" + postId + "/messages"
            );
            messagesRef
              .once("child_added", (allMesages) => {
                allMesagesArray.push(allMesages.val());
              })
              .then(() => {
                let newMessage = {
                  userName: firebaseAuth.currentUser.displayName,
                  imgUser: firebaseAuth.currentUser.photoURL,
                  idUser: firebaseAuth.currentUser.uid,
                  message: this.textMessage,
                  date: new Date().getTime(),
                };
                allMesagesArray.push(newMessage);
                allMesagesArray.sort((a, b) => {
                  return a.date - b.date;
                });

                messagesRef.set(allMesagesArray);
              });
          }
        });
    },
    goToTop() {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    },
  },
  computed: {
    ...mapGetters("settingsUser", ["getUserId"]),
  },
  mounted() {
    setTimeout(() => {
      /*-------------- Read Info Actual User Page  ---------------- */
      const userId = firebaseAuth.currentUser.uid;
      let currentUserInformationRef = firebaseDb.ref(
        "toneygram/users/" + userId
      );
      currentUserInformationRef
        .once("value", (userAuth) => {
          let userInformation = userAuth.val();
          // User information
          this.actualUserInformation = userInformation;
        })
        .then(() => {
          this.userInformationStatus = true;
        })
        .catch(() => {
          this.userInformationStatus = false;
        });

      /*  ------------- Read Posts From Followings  ------------- */
      let postsRef = firebaseDb.ref("toneygram/posts/");
      let currentUserAllInfo = firebaseDb.ref(
        "toneygram/users/" + firebaseAuth.currentUser.uid
      );
      let followingCurrentUserPosts = firebaseDb.ref(
        "toneygram/users/" + firebaseAuth.currentUser.uid + "/following"
      );
      currentUserAllInfo.once("value", (allUserInfo) => {
        let allUserInfoVar = allUserInfo.val();
        //  ----------------------------------------- If user has following ------------------------------------------ //
        if (allUserInfoVar.following) {
          // Loop though the following users
          followingCurrentUserPosts.once("value", (UsersFromFollowing) => {
            let usersFromFollowingVar = UsersFromFollowing.val();
            postsRef.once("child_added", (users) => {
              if (users.key in usersFromFollowingVar) {
                Object.values(users.val()).forEach((post) => {
                  this.postsToShow.push(post);
                  this.postsToShow.sort((a, b) => {
                    return (
                      new Date(b.fullD).getTime() - new Date(a.fullD).getTime()
                    );
                  });
                });
              }
            });
          });
          // Loop through the no following users
          postsRef
            .once("value", (allUsers) => {
              // First we loop on the all users section
              let allUsersVar = allUsers.val();
              let allUsersVarArray = Object.values(allUsersVar);
              let arrayUsers = [];

              // We loop 5 times the object, so we ended passing 5 users to the arrayUsers
              do {
                for (let index = 0; index <= 5; index++) {
                  let user =
                    allUsersVarArray[
                      Math.floor(Math.random() * allUsersVarArray.length)
                    ];
                  arrayUsers.push(user);
                  arrayUsers.length = 5;
                }
                arrayUsers = arrayUsers.filter(function (item, pos) {
                  return arrayUsers.indexOf(item) == pos;
                });
              } while (arrayUsers.length < 5);
              // We loop every user that is in the array in order to get 1 post of each one of them
              let randomNumber = Math.floor(Math.random() * arrayUsers.length);
              arrayUsers.forEach((User) => {
                // For every user we must have one post
                if (Object.values(User).length > 1) {
                  this.postsExplore.push(Object.values(User)[randomNumber]);
                } else {
                  this.postsExplore.push(Object.values(User)[0]);
                }
              });
            })
            .then(() => {
              this.postsFollowingStatus = true;
            })
            .catch(() => {
              this.postsFollowingStatus = false;
            });
          if (this.postsToShow.length === 0) {
            this.tab = "explore";
          }
          // ----------------------------------------- If user doesn't have any following ------------------------------------- //
        } else {
          // Loop on the posts section
          postsRef
            .once("value", (allUsers) => {
              // First we loop on the all users section
              let allUsersVar = allUsers.val();
              let allUsersVarArray = Object.values(allUsersVar);
              let arrayUsers = [];

              // We loop 5 times the object, so we ended passing 5 users to the arrayUsers
              do {
                for (let index = 0; index <= 5; index++) {
                  let user =
                    allUsersVarArray[
                      Math.floor(Math.random() * allUsersVarArray.length)
                    ];
                  arrayUsers.push(user);
                  arrayUsers.length = 5;
                }
                arrayUsers = arrayUsers.filter(function (item, pos) {
                  return arrayUsers.indexOf(item) == pos;
                });
              } while (arrayUsers.length < 5);
              // We loop every user that is in the array in order to get 1 post of each one of them
              let lastIndexOfArray = Math.floor(
                Math.random() * arrayUsers.length
              );
              arrayUsers.forEach((User) => {
                // For every user we must have one post
                if (Object.values(User).length > 1) {
                  this.postsExplore.push(Object.values(User)[lastIndexOfArray]);
                } else {
                  this.postsExplore.push(Object.values(User)[0]);
                }
              });
            })
            .then(() => {
              this.postsFollowingStatus = true;
            })
            .catch(() => {
              this.postsFollowingStatus = false;
            });
          if (this.postsToShow.length === 0) {
            this.tab = "explore";
          }
        }
      });

      /*  ------------- Read Posts From Current User  ------------- */
      let postsCurrentUser = firebaseDb.ref(
        "toneygram/users/" + firebaseAuth.currentUser.uid + "/posts"
      );
      postsCurrentUser.once("child_added", (postsFromCurrentUser) => {
        let posts = postsFromCurrentUser.val();
        this.postsToShow.push(posts);
        this.postsToShow.sort((a, b) => {
          return a.fullD - b.fullD;
        });
      });

      this.postsCurrentUserStatus = true;
      /*  ------------- Suggested Users  ------------- */
      const allUsers = firebaseDb.ref("toneygram/users");
      allUsers.once("value", (allUsers) => {
        let allUsersVar = allUsers.val();
        // Actual User followings
        const actualUserInfo = firebaseDb.ref(
          "toneygram/users/" + firebaseAuth.currentUser.uid
        );
        actualUserInfo
          .once("value", (userInfoActual) => {
            let actualUserInfo = userInfoActual.val();
            // If doesnt has any following
            if (!actualUserInfo.following) {
              Object.values(allUsersVar).forEach((User) => {
                if (User.userInformation.id !== firebaseAuth.currentUser.uid) {
                  this.suggetionsUsers.push(User);
                  if (this.suggetionsUsers.length > 5) {
                    this.suggetionsUsers.splice(5, this.suggetionsUsers.length);
                  }
                }
              });
            }
            // If the user follows any user
            else {
              for (const user in allUsersVar) {
                if (
                  !(user in actualUserInfo.following) &&
                  user !== firebaseAuth.currentUser.uid
                ) {
                  this.suggetionsUsers.push(allUsersVar[user]);
                  if (this.suggetionsUsers.length > 5) {
                    this.suggetionsUsers.splice(5, this.suggetionsUsers.length);
                  }
                }
              }
            }
          })
          .then(() => {
            this.suggestedUsersStatus = true;
            window.scrollTo(0, 0);
          })
          .catch(() => {
            this.suggestedUsersStatus = false;
            window.scrollTo(0, 0);
          });
      });
    }, 1000);
  },
};
</script>
<style lang="scss">
// iPhone
@media (max-width: 480px) {
  .cardBase {
    width: 100%;
  }
  .mobileBase {
    display: block;
  }
  .desktopBase {
    display: none;
  }
}

// Tablet
@media (min-width: 480px) {
  .cardBase {
    width: 100%;
  }
  .mobileBase {
    display: block;
  }
  .desktopBase {
    display: none;
  }
}

// Desktop
@media (min-width: 768px) {
  .cardBase {
    width: 100%;
    border: 1px solid lightgrey;
  }
  .homeBase {
    align-items: start;
  }
  .mobileBase {
    display: none;
  }
  .desktopBase {
    display: flex;
  }
  .desktopBaseNew {
    display: none;
  }
}

// Desktop New Base
@media (min-width: 1010px) {
  .cardBase {
    width: 100%;
    border: 1px solid lightgrey;
  }
  .homeBase {
    align-items: start;
  }
  .mobileBase {
    display: none;
  }
  .desktopBase {
    display: flex;
  }
  .desktopBaseNew {
    padding-top: 0.5rem;
    display: flex;
  }
}

.myCardBase {
  width: 16rem;
}

.imageMyCard {
  width: 100%;
  height: 100%;
}

.imgBase {
  width: 4rem;
  height: 4rem;
}
</style>
