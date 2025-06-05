/**
 * 環境參數配置
 */
const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
	dev: {
		baseApi: '/api',
		mockApi: 'https://m1.apifoxmock.com/m1/6469836-6168815-default/502/',
	},
	test: {
		baseApi: '//test.xxx.com/api',
		mockApi: 'https://m1.apifoxmock.com/m1/6469836-6168815-default/502/',
	},
	prod: {
		baseApi: '//xxx.com/api',
		mockApi: 'https://m1.apifoxmock.com/m1/6469836-6168815-default/502/',
	},
};
export default {
	env,
	// mock: true,
	mock: false,
	namespace: 'manager',
	...EnvConfig[env],
};
