<template>
	<div class="user-manage">
		<div class="query-form">
			<el-form :inline="true" :model="user" ref="formRef">
				<el-form-item label="用戶ID" prop="userId">
					<el-input v-model="user.userId" placeholder="請輸入用戶ID" />
				</el-form-item>
				<el-form-item label="用戶名稱" prop="userName">
					<el-input v-model="user.userName" placeholder="請輸入用戶名稱" />
				</el-form-item>
				<el-form-item label="狀態" prop="state">
					<el-select v-model="user.state">
						<el-option :value="0" label="全部"></el-option>
						<el-option :value="1" label="在職"></el-option>
						<el-option :value="2" label="離職"></el-option>
						<el-option :value="3" label="試用期"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuery">搜尋</el-button>
					<el-button @click="handleReset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="base-table">
			<div class="action">
				<el-button type="primary">新增</el-button>
				<el-button type="danger" @click="handlePatchDel">批次刪除</el-button>
			</div>
			<el-table :data="userList" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" />
				<el-table-column
					v-for="item in columns"
					:key="item.prop"
					:prop="item.prop"
					:label="item.label"
					:width="item.width"
					:formatter="item.formatter || undefined"
				>
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template #default="scope">
						<el-button @click="handleClick(scope.row)" size="mini"
							>編輯</el-button
						>
						<el-button type="danger" size="mini" @click="handleDel(scope.row)"
							>刪除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				class="pagination"
				background
				layout="prev, pager, next"
				:total="pager.total"
				:page-size="pager.pageSize"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>
<script>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
export default {
	name: 'user',
	setup() {
		// 獲取上下文
		// const { ctx } = getCurrentInstance();
		const internalInstance = getCurrentInstance();
		const $api = internalInstance.appContext.config.globalProperties.$api;
		const $message =
			internalInstance.appContext.config.globalProperties.$message;

		// 初始化用戶表單
		const user = reactive({
			state: 0,
		});
		// 初始化用戶列表
		const userList = ref([]);
		// 初始化分頁對象
		const pager = reactive({
			pageNum: 1,
			pageSize: 10,
		});
		// 定義表格
		const columns = reactive([
			{
				label: '用戶ID',
				prop: 'userId',
			},
			{
				label: '用戶名稱',
				prop: 'userName',
			},
			{
				label: '用戶信箱',
				prop: 'userEmail',
			},
			{
				label: '用戶角色',
				prop: 'role',
				formatter(row, column, value) {
					return {
						0: '管理員',
						1: '一般用戶',
					}[value];
				},
			},
			{
				label: '用戶狀態',
				prop: 'state',
				formatter(row, column, value) {
					return {
						1: '在職',
						2: '離職',
						3: '試用期',
					}[value];
				},
			},
			{
				label: '註冊時間',
				prop: 'createTime',
			},
			{
				label: '最後登入時間',
				prop: 'lastLoginTime',
			},
		]);
		// 選中用戶的對象
		const checkedUserIds = ref([]);
		let formRef = ref(null);
		onMounted(() => {
			getUserList();
		});
		// 取得用戶列表
		const getUserList = async () => {
			let params = { ...user, ...pager };

			try {
				const { list, page } = await $api.getUserList(params);
				userList.value = list;
				pager.total = page.total;
			} catch (error) {}
		};
		// 查詢事件並取用戶列表
		const handleQuery = () => {
			getUserList();
		};
		// 重置查詢
		const handleReset = () => {
			formRef.value?.resetFields();
		};
		// 分頁事件處理
		const handleCurrentChange = (current) => {
			pager.pageNum = current;
			getUserList();
		};
		// 用戶單一刪除
		const handleDel = async (row) => {
			await $api.userDel({
				userIds: [row.userId],
			});
			$message.success('刪除成功');
			getUserList();
		};
		// 批次删除
		const handlePatchDel = async () => {
			console.log('checkedUserIds', checkedUserIds);
			if (checkedUserIds.value.length == 0) {
				$message.error('請選擇要刪除的用戶');
				return;
			}
			const res = await $api.userDel({
				userIds: checkedUserIds.value,
			});
			if (res.nModified > 0) {
				$message.success('刪除成功');
				getUserList();
			} else {
				$message.success('刪除失敗');
			}
		};
		// 表格多選
		const handleSelectionChange = (list) => {
			let arr = [];
			list.map((item) => {
				arr.push(item.userId);
			});
			checkedUserIds.value = arr;
		};

		return {
			user,
			userList,
			columns,
			pager,
			formRef,
			getUserList,
			handleQuery,
			handleReset,
			handleCurrentChange,
			handleDel,
			handlePatchDel,
			handleSelectionChange,
		};
	},
};
</script>

<style lang="scss"></style>
