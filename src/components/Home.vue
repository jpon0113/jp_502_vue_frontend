<template>
	<div class="basic-layout">
		<div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
			<!-- LOGO -->
			<div class="logo">
				<img src="./../assets/logo.png" />
				<span>Manager</span>
			</div>
			<!-- Menu -->
			<el-menu
				default-active="2"
				background-color="#001529"
				text-color="#fff"
				router
				:collapse="isCollapse"
				class="nav-menu"
			>
				<el-submenu index="1">
					<template #title>
						<i class="el-icon-setting"></i>
						<span>系統管理</span>
					</template>
					<el-menu-item index="1-1">用戶管理</el-menu-item>
					<el-menu-item index="1-2">選單管理</el-menu-item>
				</el-submenu>
				<el-submenu index="2">
					<template #title>
						<i class="el-icon-setting"></i>
						<span>審批管理</span>
					</template>
					<el-menu-item index="2-1">休假申請</el-menu-item>
					<el-menu-item index="2-2">等待審批</el-menu-item>
				</el-submenu>
			</el-menu>
		</div>
		<div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
			<div class="nav-top">
				<div class="nav-left">
					<div class="menu-fold" @click="toggle">
						<i class="el-icon-s-fold"></i>
					</div>
					<div class="bread">相對路徑</div>
				</div>
				<div class="user-info">
					<el-badge :is-dot="true" class="notice" type="danger">
						<i class="el-icon-bell"></i>
					</el-badge>
					<el-dropdown @command="handleLogout">
						<span class="user-link">
							{{ userInfo.userName }}
							<i class="el-icon--right"></i>
						</span>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item command="email"
									>信箱：{{ userInfo.userEmail }}</el-dropdown-item
								>
								<el-dropdown-item command="logout">退出</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>
				</div>
			</div>
			<div class="wrapper">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			isCollapse: false,
			userInfo: {
				userName: '承泓',
				userEmail: 'jpon@admin.com',
			},
		};
	},
	methods: {
		toggle() {
			this.isCollapse = !this.isCollapse;
		},
		handleLogout(key) {
			if (key == 'email') return;
			this.$store.commit('saveUserInfo', '');
			this.userInfo = null;
			this.$router.push('/login');
		},
	},
};
</script>

<style lang="scss">
.basic-layout {
	position: relative;
	.nav-side {
		position: fixed;
		width: 200px;
		height: 100vh;
		background-color: #001529;
		color: #fff;
		overflow-y: auto;
		transition: width 0.5s;
		.logo {
			display: flex;
			align-items: center;
			font-size: 18px;
			height: 50px;
			img {
				margin: 0 16px;
				width: 32px;
				height: 32px;
			}
		}
		.nav-menu {
			height: calc(100vh - 50px);
			border-right: none;
		}
		&.fold {
			width: 64px;
		}
		&.unfold {
			width: 200px;
		}
	}
	.content-right {
		margin-left: 200px;
		&.fold {
			margin-left: 64px;
		}
		&.unfold {
			margin-left: 200px;
		}
		.nav-top {
			height: 50px;
			line-height: 50px;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #ddd;
			padding: 0 20px;
			.nav-left {
				display: flex;
				align-items: center;
				.menu-fold {
					margin-right: 15px;
					font-size: 18px;
				}
			}
			.user-info {
				.notice {
					line-height: 30px;
					margin-right: 15px;
				}
				.user-link {
					cursor: pointer;
					color: #409eff;
				}
			}
		}
		.wrapper {
			background: #eef0f3;
			padding: 20px;
			height: calc(100vh - 50px);
			.main-page {
				background: #fff;
				height: 100%;
			}
		}
	}
}
</style>
