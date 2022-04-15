import axios from 'axios';
import {
  SEARCH_REPOSITORIES,
  SEARCH_REPOSITORIES_SUCCESS,
  SEARCH_REPOSITORIES_ERROR,
} from '../action-types';

const searchRepositories = (term) => {
  return async (dispatch) => {
    dispatch({
      type: SEARCH_REPOSITORIES,
    });
    try {
      const { data } = await axios.get(
        'https://registry.npmjs.org/-/v1/search',
        {
          params: {
            text: term,
          },
        }
      );
      const names = data.objects.map((result) => {
        return result.package.name;
      });
      dispatch({
        type: SEARCH_REPOSITORIES_SUCCESS,
        payload: names,
      });
    } catch (err) {
      dispatch({
        type: SEARCH_REPOSITORIES_ERROR,
        payload: err.message,
      });
    }
  };
};

export default searchRepositories;
