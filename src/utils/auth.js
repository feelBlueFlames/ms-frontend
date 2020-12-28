export const getToken = (tokenKey = 'access_token') => {
  return sessionStorage.getItem(tokenKey);
};

export const setToken = (token, tokenKey = 'access_token') => {
  return sessionStorage.setItem(tokenKey, token);
};

export const removeToken = (tokenKey = 'access_token') => {
  return sessionStorage.removeItem(tokenKey);
};
let timerId;
export const dealToken = ({ token, reToken, expirseTime, dispatch }) => {
  if (token) setToken('access_token', token);
  if (reToken) setToken('refresh_token', reToken);
  if (expirseTime) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      clearTimeout(timerId);
      dispatch('refreshToken');
    }, expirseTime * 1000);
  }
};
// 清空全部记录
export const clearAllRecord = () => {
  layer.closeAll();
  removeToken('access_token');
  removeToken('refresh_token');
  if (timerId) clearTimeout(timerId);
};
