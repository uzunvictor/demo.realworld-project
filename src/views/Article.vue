<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>

        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" />
          </router-link>

          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username},
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>

          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{name: 'editArticle', params: {slug: article.slug}}"
            >
              <i class="ion-edit" />
              Edit article
            </router-link>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="deleteArticle"
            >
              <i class="ion-trash-a" />
              Delete article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container-page">
      <mcv-feed-loading v-if="isLoading" />
      <mcv-error-message v-if="error" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <mcv-tag-list :tags="article.tagList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvTagList from '@/components/TagList';
import McvErrorMessage from '@/components/ErrorMessage';
import McvFeedLoading from '@/components/FeedLoading';
import {actionTypes as articleActionTypes} from '@/store/modules/article';
import {getterTypes as authGetterTypes} from '@/store/modules/auth';
import {mapState, mapGetters} from 'vuex';

export default {
  name: 'McvArticle',

  computed: {
    ...mapState({
      isLoading: (state) => state.article.isLoading,
      article: (state) => state.article.article,
      error: (state) => state.article.error,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),

    isAuthor() {
      if (!this.currentUser.username || !this.article.author.username) {
        return false;
      }

      return this.currentUser.username === this.article.author.username;
    },
  },

  mounted() {
    this.$store.dispatch(articleActionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },

  components: {
    McvFeedLoading,
    McvErrorMessage,
    McvTagList,
  },

  methods: {
    deleteArticle() {
      this.$store
        .dispatch(articleActionTypes.deleteArticle, {
          slug: this.$route.params.slug,
        })
        .then((res) => {
          this.$router.push({name: 'globalFeed'});
          alert(res);
        });
    },
  },
};
</script>
