import request from '@/utils/request';

export async function queryAllHeroData(data = {}) {
  return request('/heros/getAllHeros', {
    method: 'POST',
    data,
  });
}
export async function queryEquipData(data = {}) {
  return request('/equip/queryEquips', {
    method: 'POST',
    data,
  });
}
export async function queryCurrent() {
  return request('/user/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
