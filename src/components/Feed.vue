<template>
  <div>
    <div v-if="isLoading">Loading...</div>

    <div v-if="error">Get the error: {{ error }}</div>

    <div v-if="feedData">
      <!-- <p>{{feedData}}</p> -->
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
        :total="feedData.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import {limit} from '@/helpers/variables';
import {actionTypes, getterTypes} from '@/store/modules/feed';
import {mapGetters} from 'vuex';
import McvPagination from '@/components/Pagination';
import {stringify, parseUrl} from 'query-string';

export default {
  name: 'McvFeed',

  components: {
    McvPagination,
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

    currentPage() {
      return Number(this.$route.query.page || '1');
    },
    baseUrl() {
      return this.$route.path;
    },
    limit() {
      return limit;
    },
    offset() {
      return this.currentPage * limit - limit;
    },
  },

  watch: {
    currentPage() {
      this.fetchFeed();
    },
  },

  mounted() {
    this.fetchFeed();
    setTimeout(() => {
      console.log(this.feedData)
    },3000)
  },

  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams});
    },
  },
};
</script>
