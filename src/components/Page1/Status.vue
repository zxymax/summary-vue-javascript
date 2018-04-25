<template>
	<div>
		<h1>Status component is here</h1>
		<hr>
		<input type="text" v-model="title">
		<p v-if="title">{{title}} 被输出了</p>
		<child :title="title" />
		<Notes />
	</div>
</template>
<script>
	import Notes from './Notes'
	const Child = {
		props: {
			title: {
				type: String,
				required: true
			}
		},
		template: `
			<div>
				<p>我叫child,我是子组件，我被定义在了Status.vue这个文件里面 我要父组件里面的信息--{{title}}</p>
			</div>
		`
	}
	export default {
		data() {
			return {
				title: 'Status'
			}
		},
		components: {
			Child,
			Notes
		}
		
	}
</script>