<template>
  <div>
    <div v-if="isLoading">Loading...</div>

    <div v-if="error">Get the error: {{ error }}</div>

    <div v-if="feedData">
      <div
        class="article-preview"
        v-for="(article, index) in feedData.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
            ><img :src="article.author.image" /> </router-link
          >&nbsp;
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
              class="author"
              >{{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">Add to favorites</div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          Tag List
        </router-link>
      </div>
      <mcv-pagination
        :total="total"
        :limit="limit"
        :current-page="currentPage"
        :url="url"
      />
    </div>
  </div>
</template>

<script>
import {actionTypes, getterTypes} from '@/store/modules/feed';
import {mapGetters} from 'vuex';
import McvPagination from '@/components/Pagination';

export default {
  name: 'McvFeed',

  components: {
    McvPagination,
  },

  data() {
    return {
      total: 100,
      limit: 10,
      currentPage: 5,
      url: 'tags/dragons',
    };
  },
  
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      feedData: getterTypes.getFeed,
      isLoading: getterTypes.isLoading,
      error: getterTypes.error,
    }),
  },

  mounted() {
    this.$store.dispatch(actionTypes.getFeed, {apiUrl: this.apiUrl});
  },
};
</script>
