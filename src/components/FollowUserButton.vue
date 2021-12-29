<template>
  <div>
    <button
      class="btn btn-sm btn-outline-secondary action-btn"
      v-if="!isCurrentUserProfile"
      @click="followUser"
    >
      <i class="ion-plus"></i>&nbsp;
      {{ followButtonText }}
    </button>
  </div>
</template>

<script>
import {actionTypes as followUserActionTypes} from '@/store/modules/followUser';

export default {
  name: 'McvFollowUserButton',

  data() {
    return {
      isFollowing: null,
    };
  },

  props: {
    profile: {
      type: Object,
      required: true,
    },

    isCurrentUserProfile: {
      type: Boolean,
      required: true,
    },

    userProfileSlug: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.isFollowing = this.isFollowed;
  },

  computed: {
    followButtonText() {
      if (!this.isFollowing) return `Follow ${this.profile.username}`;
      else return `Unfollow ${this.profile.username}`;
    },

    isFollowed() {
      return this.profile.following;
    },

    // isFollowing() {
    //   return this.isFollowed;
    // },
  },

  methods: {
    followUser() {
      if (!this.isFollowing) {
        this.$store.dispatch(followUserActionTypes.followUser, {
          slug: this.userProfileSlug,
          credentials: {
            ...this.profile,
          },
        });
      }

      if (this.isFollowing) {
        this.$store.dispatch(followUserActionTypes.unfollowUser, {
          slug: this.userProfileSlug,
          credentials: {
            ...this.profile,
          },
        });
      }

      this.isFollowing = !this.isFollowing;
    },
  },
};
</script>
