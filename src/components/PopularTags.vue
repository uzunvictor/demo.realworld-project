<template>
  <div>
    <mcv-loading v-if="isLoading" />

    <mcv-error-message v-if="error" :message="error" />

    <div class="sidebar" v-if="tags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
          class="tag-default tag-pill"
          v-for="tag in tags"
          :key="tag"
          :to="{name: 'tag', params: {slug: tag}}"
        >
          <div>{{ tag }}</div>
          <!-- <div v-if="zeroTags">Backend gives us the empty array)))</div> -->
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import McvErrorMessage from '@/components/ErrorMessage';
import McvLoading from '@/components/Loading';
import {actionTypes} from '@/store/modules/popularTags';
import {mapState} from 'vuex';

export default {
  name: 'McvPopularTags',

  computed: {
    ...mapState({
      isLoading: (state) => state.popularTags.isLoading,
      error: (state) => state.popularTags.error,
      tags: (state) => state.popularTags.tags,
    }),
    // zeroTags() {
    //   return this.tags.length === 0;
    // },
  },

  mounted() {
    this.$store.dispatch(actionTypes.getTags);
   // console.log(this.tags.length);
  },

  components: {
    McvLoading,
    McvErrorMessage,
  },
};
</script>
