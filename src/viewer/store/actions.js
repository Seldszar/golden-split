import axios from 'axios';
import { forEach, get } from 'lodash';
import * as types from './mutation-types';

export default {
  async fetchChannel({ commit }, { channelId }) {
    const response = await axios.get(`https://api.twitch.tv/kraken/channels/${channelId}`, {
      headers: {
        Accept: 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'qy9d4h2an3o87q7jzpauj8k6tiqacp',
      },
    });

    commit(types.RECEIVE_CHANNEL, { channel: response.data });
  },
  async fetchUser({ commit }, { channelName }) {
    const response = await axios.get(`https://www.speedrun.com/api/v1/users?twitch=${channelName}`);
    const user = get(response.data, 'data.0', null);

    if (!user) {
      throw new Error();
    }

    commit(types.RECEIVE_USER, { user });
  },
  async fetchPersonalBests({ commit }, { userId }) {
    const response = await axios.get(`https://www.speedrun.com/api/v1/users/${userId}/personal-bests`, {
      params: {
        embed: ['game', 'category', 'platform'],
      },
    });

    forEach(get(response.data, 'data', []), (personalBest) => {
      const {
        platform, category, game, run,
      } = personalBest;

      commit(types.RECEIVE_PLATFORM, { platform: platform.data });
      commit(types.RECEIVE_CATEGORY, { category: category.data });
      commit(types.RECEIVE_GAME, { game: game.data });
      commit(types.RECEIVE_RUN, { run });
    });
  },
};
