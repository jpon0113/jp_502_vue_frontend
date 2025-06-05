import { createStore } from 'vuex';
import mutations from './mutations';
import storage from './../utils/storage';

const state = {
	userInfo: '' || storage.getItem('userInfo'), // 取得用戶資訊
};
export default createStore({
	state,
	mutations,
});
