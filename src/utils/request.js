/**
 * axios 封裝
 */
import axios from 'axios';
import config from './../config';
import { ElMessage } from 'element-plus';
import router from './../router';

const TOKEN_INVALID = 'Token 認證失敗, 請重新登錄';
const NETWORK_ERROR = '網路請求異常, 請稍後再試';

// 建立axios instance，設置全局參數
const service = axios.create({
	baseURL: config.baseApi,
	timeout: 8000,
});

// 請求攔截
service.interceptors.request.use((req) => {
	// TO-DO
	const headers = req.headers;
	if (!headers.Authorization) headers.Authorization = 'Bear Jack';
	return req;
});

// 回覆攔截
service.interceptors.response.use((res) => {
	const { code, data, msg } = res.data;
	if (code === 200) {
		return data;
	} else if (code === 40001) {
		ElMessage.error(TOKEN_INVALID);
		setTimeout(() => {
			router.push('/login');
		}, 15000);
		return Promise.reject(TOKEN_INVALID);
	} else {
		ElMessage.error(msg || NETWORK_ERROR);
		return Promise.reject(msg || NETWORK_ERROR);
	}
});
/**
 * 請求核心函數
 * @param {*} options
 */
function request(options) {
	options.method = options.method || 'get';
	if (options.method.toLowerCase() === 'get') {
		options.params = options.data;
	}

	if (config.env === 'prod') {
		service.defaults.baseURL = config.baseApi;
	} else {
		service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi;
	}

	return service(options);
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
	request[item] = (url, data, options) => {
		return request({
			url,
			data,
			method: item,
			...options,
		});
	};
});

export default request;
