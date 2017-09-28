<template>
  <div class="App" v-bind:class="{ 'App--loading': loading, 'App--error': !!error }">
    <div class="App__header">
      <div class="Header">
        <div class="Header__title">
          My Personal Best Times
        </div>
        <div class="Header__poweredBy">
          Powered by <a href="https://www.speedrun.com" target="_blank">speedrun.com</a>
        </div>
      </div>
    </div>
    <div class="App__content">
      <div v-if="loading">
        <i>Loading...</i>
      </div>
      <div v-if="error" v-html="error" />
      <div class="App__games">
        <div class="App__game" v-for="game in games" v-bind:key="game.id">
          <game v-bind:game="game" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex';
  import Twitch from 'twitch';
  import Game from './components/Game.vue';

  export default {
    components: { Game },
    data() {
      return {
        loading: true,
        error: null,
      };
    },
    computed: {
      ...mapState([
        'channel',
        'user',
      ]),
      ...mapGetters([
        'games',
      ]),
    },
    async created() {
      Twitch.ext.onAuthorized(async (auth) => {
        try {
          await this.fetchChannel({ channelId: auth.channelId });

          try {
            await this.fetchUser({ channelName: this.channel.name });

            try {
              await this.fetchPersonalBests({ userId: this.user.id });
            } catch (error) {
              this.error = `An error occured during the fetch of personal best times: ${error.message}`;
            }
          } catch (error) {
            this.error = `Speedrun.com user with the associated channel &laquo;&nbsp;<strong>${this.channel.name}</strong>&nbsp;&raquo; not found`;
          }
        } catch (error) {
          this.error = `An error occured during the fetch of channel &laquo;&nbsp;<strong>${this.channel.name}</strong>&nbsp;&raquo;: ${error.message}`;
        }

        this.loading = false;
      });

      Twitch.ext.onError((error) => {
        this.error = error;
      });
    },
    methods: {
      ...mapActions([
        'fetchChannel',
        'fetchUser',
        'fetchPersonalBests',
      ]),
    },
  };
</script>

<style lang="scss">
  @import "settings";
  @import "foundation";

  @include foundation-global-styles;
  @include foundation-typography;

  ::-webkit-scrollbar {
    background-color: $black;
    height: 4px;
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: $primary-color;
  }

  html,
  body {
    height: 100%;
  }

  body {
    background: radial-gradient(farthest-corner at 50% 20%, scale-color($black, $lightness: 8%), scale-color($black, $lightness: 4%));
    min-height: 100%;
  }

  .App {
    @include xy-grid($direction: vertical);
    @include xy-grid-frame($vertical: true);

    &__header {
      @include xy-cell-base($size: shrink);
      background-color: scale-color($black, $lightness: 8%);
      border-bottom: 1px solid $black;
      box-shadow: 0 1px 1px rgba($black, .5);
      line-height: 1;
      padding: 1rem;
      text-align: center;
      text-transform: uppercase;
    }

    &__content {
      @include xy-cell-base($size: auto);
      @include xy-cell-block-container;
      @include xy-cell-block($vertical: true);
    }

    &--loading,
    &--error {

      .App {

        &__content {
          align-items: center;
          display: flex;
          justify-content: center;
          padding: 1rem;
          text-align: center;
        }
      }
    }
  }

  .Header {

    &__title {
      font-weight: 700;
    }

    &__poweredBy {
      color: $dark-gray;
      font-size: rem-calc(8);
      margin-top: 2px;
    }
  }
</style>
