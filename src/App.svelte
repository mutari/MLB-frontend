<script>

	import { getAllTitles } from './Tools/crud';
	import UploadFiles from './Song/UploadFiles.svelte';

	let data = "";

	(async () => {
		data = await getAllTitles();
		console.log(data);
	})()



</script>

<main>
	<UploadFiles/>
</main>

<style>

</style>