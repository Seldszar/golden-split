/* eslint-disable no-param-reassign */

import Vue from 'vue';
import * as types from './mutation-types';

export default {
  [types.RECEIVE_CHANNEL](state, { channel }) {
    state.channel = channel;
  },
  [types.RECEIVE_USER](state, { user }) {
    state.user = user;
  },
  [types.RECEIVE_GAME](state, { game }) {
    Vue.set(state.games, game.id, game);
  },
  [types.RECEIVE_CATEGORY](state, { category }) {
    Vue.set(state.categories, category.id, category);
  },
  [types.RECEIVE_PLATFORM](state, { platform }) {
    Vue.set(state.platforms, platform.id, platform);
  },
  [types.RECEIVE_RUN](state, { run }) {
    Vue.set(state.runs, run.id, run);
  },
};
