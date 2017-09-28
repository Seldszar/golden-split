import {
  filter, find, get, sortBy, toArray, toLower,
} from 'lodash';

export default {
  games(state) {
    return sortBy(state.games, 'names.international');
  },
  findGameByName(state) {
    return name => find(state.games, game => toLower(get(game, 'names.international')) === toLower(name));
  },
  getRunsByGameId(state) {
    return game => sortBy(filter(toArray(state.runs), { game }), 'name');
  },
  getPlatformById(state) {
    return id => state.platforms[id];
  },
  getCategoryById(state) {
    return id => state.categories[id];
  },
};
