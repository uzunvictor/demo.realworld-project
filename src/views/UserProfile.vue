<template>
  <div class="profile-page" v-if="profile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="profile.image" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <div>
              <mcv-follow-user-button
                v-if="profile"
                :profile="profile"
                :is-current-user-profile="isCurrentUserProfile"
                :userProfileSlug="userProfileSlug"
              />
              <router-link
                v-if="isCurrentUserProfile"
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{name: 'settings'}"
              >
                Edit profile settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  :to="{name: 'userProfile', params: {slug: profile.username}}"
                  class="nav-link"
                  :class="{active: routeName === 'userProfile'}"
                  >My Posts</router-link
                >
              </li>

              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'userProfileFavorites',
                    params: {slug: profile.username},
                  }"
                  class="nav-link"
                  :class="{active: routeName === 'userProfileFavorites'}"
                  >Favorites Posts</router-link
                >
              </li>
            </ul>
          </div>
          <mcv-feed :api-url="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {actionTypes as userProfileActionTypes} from '@/store/modules/userProfile';
import McvFollowUserButton from '@/components/FollowUserButton';
import {getterTypes as authGetterTypes} from '@/store/modules/auth';
import {mapGetters, mapState} from 'vuex';
import McvFeed from '@/components/Feed';

export default {
  name: 'McvUserProfile',

  computed: {
    ...mapState({
      isLoading: (state) => state.userProfile.isLoading,
      errors: (state) => state.userProfile.errors,
      profile: (state) => state.userProfile.profile,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isCurrentUserProfile() {
      if (!this.currentUser || !this.profile) {
        return false;
      }

      return this.currentUser.username === this.profile.username;
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes('favorites');
      return isFavorites
        ? `/articles?favorited=${this.userProfileSlug}`
        : `/articles?author=${this.userProfileSlug}`;

      ///articles?favorited=haholll1989&limit=5&offset=0
    },
    userProfileSlug() {
      return this.$route.params.slug;
    },
    routeName() {
      return this.$route.name;
    },
  },

  watch: {
    userProfileSlug() {
      this.fetchUserProfile();
    },
  },

  methods: {
    fetchUserProfile() {
      this.$store.dispatch(userProfileActionTypes.getUserProfile, {
        slug: this.userProfileSlug,
      });
    },
  },

  mounted() {
    this.fetchUserProfile();
  },

  components: {
    McvFeed,
    McvFollowUserButton,
  },
};
</script>

<style lang="scss" scoped></style>
