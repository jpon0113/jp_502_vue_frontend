<template>
	<h1>Welcome to Home Page - {{ msg }}</h1>
	<router-link to="/login">go to Login</router-link>
</template>

<script>
export default {
	name: 'welcome',
	props: ['msg'],
};
</script>

<style scoped>
a {
	color: #42b983;
}
</style>
