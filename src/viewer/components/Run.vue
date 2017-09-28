<template>
  <a class="Run" v-bind:href="run.weblink" target="_blank">
    <div class="Run__category">
      {{ category.name }}
    </div>
    <div class="Run__time">
      <div class="Run__timeValue">
        {{ formatTime(run.times.primary_t) }}
      </div>
      <div class="Run__timeType">
        {{ timeType }}
      </div>
    </div>
  </a>
</template>

<script>
  export default {
    props: ['run'],
    computed: {
      category() {
        return this.$store.getters.getCategoryById(this.run.category);
      },
      timeType() {
        const { times } = this.run;

        switch (times.primary_t) {
          case times.ingame_t:
            return 'In-game time';

          case times.realtime_noloads_t:
            return 'Real time without loads';

          default:
            return 'Real time';
        }
      },
    },
    methods: {
      formatTime(time) {
        const hours = Math.floor((time / 3600) % 24);
        const minutes = Math.floor((time / 60) % 60);
        const seconds = time % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      },
    },
  };
</script>

<style lang="scss">
  @import "settings";
  @import "foundation";

  .Run {
    @include xy-grid();
    color: inherit !important;
    line-height: 1;

    &__category {
      @include xy-cell(auto, false);
    }

    &__time {
      @include xy-cell(shrink, false);
      font-weight: 700;
      margin-left: 1rem;
      text-align: right;
    }

    &__timeType {
      color: $dark-gray;
      font-size: rem-calc(8);
      margin-top: 2px;
      text-transform: uppercase;
    }

    &:hover {

      .Run__category {
        text-decoration: underline;
      }
    }
  }
</style>
