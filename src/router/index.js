import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '@/components/Home.vue';

const routes = [
	{
		name: 'home',
		path: '/',
		meta: {
			title: '首頁',
		},
		component: Home,
		redirect: '/welcome',
		children: [
			{
				name: 'welcome',
				path: '/welcome',
				meta: {
					title: '歡迎頁面',
				},
				component: () => import('@/views/Welcome.vue'),
			},
			{
				name: 'user',
				path: 'user',
				meta: {
					title: '用戶管理',
				},
				component: () => import('@/views/User.vue'),
			},
		],
	},
	{
		name: 'login',
		path: '/login',
		meta: {
			title: '登入',
		},
		component: () => import('./../views/Login.vue'),
	},
];
const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
