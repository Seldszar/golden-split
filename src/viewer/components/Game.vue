<template>
  <div class="Game">
    <div class="Game__cover">
      <img v-bind:src="game.assets['cover-small'].uri">
    </div>
    <div class="Game__content">
      <div class="Game__header">
        <div class="Game__name">
          {{ game.names.international }}
        </div>
      </div>
      <div class="Game__runs">
        <div class="Game__run" v-for="run in runs" v-bind:key="run.id">
          <run v-bind:run="run" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Run from './Run.vue';

  export default {
    components: { Run },
    props: ['game'],
    computed: {
      runs() {
        return this.$store.getters.getRunsByGameId(this.game.id);
      },
    },
  };
</script>

<style lang="scss">
  @import "settings";
  @import "foundation";

  .Game {
    @include xy-grid();
    padding: 1rem;
    position: relative;

    &__cover {
      margin-right: 1rem;
      width: 40px;

      img {
        box-shadow: 0 0 5px #000;
        display: block;
      }
    }

    &__content {
      @include xy-cell(auto, false);
    }

    &__header {
      border-bottom: 1px solid $dark-gray;
      margin-bottom: .5rem;
      padding-bottom: .5rem;
    }

    &__name {
      font-weight: 700;
      line-height: 1;
      text-transform: uppercase;
    }

    &__platform {
      color: $dark-gray;
      font-size: rem-calc(8);
      margin-top: 2px;
      text-transform: uppercase;
    }

    &__run {
      margin-bottom: .5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
