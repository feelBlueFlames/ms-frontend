import { queryAllHeroData, queryEquipData } from '@/services/hero';

const UserModel = {
  namespace: 'hero',
  state: {
    heros: [],
    equips: [],
    skills: [],
  },
  effects: {
    *getAllHeroData({ payload }, { call, put }) {
      console.log(payload);
      const response = yield call(queryAllHeroData, payload);
      if (response.code === 1) {
        yield put({
          type: 'initHeros',
          payload: response.data,
        });
      }
    },
    *getAllEquipData({ payload }, { call, put }) {
      console.log('initEquips')
      const response = yield call(queryEquipData, payload);
      if (response.code === 1) {
        yield put({
          type: 'initEquips',
          payload: response.data,
        });
      }
    },
  },
  reducers: {
    initHeros(state, action) {
      return { ...state, heros: action.payload || [] };
    },
    initEquips(state, action) {
      return { ...state, equips: action.payload || [] };
    },
  },
  subscriptions: {
    initHeroData: ({ dispatch, history }, done) => {
      history.listen(({ pathname }) => {
        /*   if (pathname === '/hero') {
          dispatch({
            type: 'getAllHeroData',
          });
        } */
      });
    },
  },
};
export default UserModel;
