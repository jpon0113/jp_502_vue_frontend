<template>
	<h1>Login Page</h1>
	<Welcome msg="JPON" />
	<el-button @click="goHome">Back Home</el-button>
</template>

<script>
import Welcome from './Welcome.vue';
export default {
	name: 'login',
	components: { Welcome },
	mounted() {
		this.$request
			.get('/login', { name: 'JPON' }, { mock: true, loading: true })
			.then((res) => {
				console.log(res);
			});
	},
	methods: {
		goHome() {
			this.$router.push('/welcome');
		},
	},
};
</script>

<style scoped>
a {
	color: #42b983;
}
</style>
