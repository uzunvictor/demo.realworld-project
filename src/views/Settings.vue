<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <mcv-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="URL of profile image"
                  v-model="form.image"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Username"
                  v-model="form.username"
                />
              </fieldset>

              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  placeholder="Short biography bout you"
                  v-model="form.bio"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Email"
                  v-model="form.email"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  placeholder="Password"
                  v-model="form.password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                :disabled="isSubmitting"
              >
                Update settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import {
  getterTypes as authGetterTypes,
  actionTypes as authActionTypes,
} from '@/store/modules/auth';
import McvValidationErrors from '@/components/ValidationErrors';

export default {
  name: 'McvSettings',

  computed: {
    ...mapState({
      isSubmitting: (state) => state.settings.isSubmitting,
      validationErrors: (state) => state.settings.validationErrors,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    form() {
      return {
        username: this.currentUser.username,
        bio: this.currentUser.bio,
        email: this.currentUser.email,
        image: this.currentUser.image,
        password: this.currentUser.password,
      };
    },
  },

  methods: {
    onSubmit() {
      this.$store.dispatch(authActionTypes.updateCurrentUser, {
        currentUserInput: this.form,
      });
    },

    logout() {
      this.$store.dispatch(authActionTypes.logout).then(() => this.$router.push({name: 'globalFeed'}))
    },
  },

  components: {
    McvValidationErrors,
  },

  mounted() {
    setTimeout(() => {
      console.log(this.currentUser);
    }, 3000);
  },
};
</script>
