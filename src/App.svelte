<script async>

	import { send } from './Tools/crud';
	import { state, data, selectedMenuItem, user, popUpState } from './Tools/store';

	import NavMenu from './Song/NavMenu.svelte';
	import TailwindSettUp from './Tools/tailwind.svelte';
	import DisplaySong from './Song/DisplaySong.svelte';
	import FootMeny from './Song/footMenu.svelte';

	import LoginPopUp from './Song/PopUp/LoginPopUp.svelte';
	import StartMenuPopUp from './Song/PopUp/StartMenuPopUp.svelte';
	import CodePopUp from './Song/PopUp/CodePopUp.svelte';
	import AddToPlaylistPopUp from './Song/PopUp/addToPlaylistPopUp.svelte';
	import CreateSongPopUp from './Song/PopUp/CreateSongPopUp.svelte';
	import DeleteConfirmPopUp from './Song/PopUp/delete.confirmPopUp.svelte';
	import UpdateSongPopUp from './Song/PopUp/updateSongPopUp.svelte';
	import UpdatePlayListPopUp from './Song/PopUp/updatePlayListPopUp.svelte'
	import NewPlayListPopUp from './Song/PopUp/NewPlayListPopUp.svelte';
	import NewAcountPopUp from './Song/PopUp/newAcountPopUp.svelte';



	let User = "";

	(async () => {
		User = await send('http://localhost:8000/');
		console.log(User)
		if(User.status != 403) {
			user.update(value => value = User.user);
		} else popUpState.update(value => value = "notLogedIn");
	})()

	let latest_state;
	$: state.subscribe(value => latest_state = value);

	let latest_data;
	$: data.subscribe(value => latest_data = value);
	$: console.log('tatest data :: ', latest_data);

	let latest_selectedItem;
	$: selectedMenuItem.subscribe(value => {
		if(value.id)
			latest_selectedItem = latest_data.songs.filter(v => v.id == value.id)[0]
	});

	let latest_popUpState;
	$: popUpState.subscribe(value => latest_popUpState = value);

</script>

<main class="h-full">
	<NavMenu/>
	{#if latest_state == "show"}
		{#if latest_selectedItem}
			<DisplaySong title={latest_selectedItem.title} lyrics={latest_selectedItem.lyrics_text} image={latest_selectedItem.lyrics_image_path} mp3={latest_selectedItem.mp3_path}/>
		{:else}
			<DisplaySong/>
		{/if}
	{/if}
</main>

{#if latest_popUpState == "login"}
	<div class="background">
		<LoginPopUp/>
	</div>
{/if}

{#if latest_popUpState == 'notLogedIn'}
	<div class="background">
		<StartMenuPopUp/>
	</div>
{/if}

{#if latest_popUpState == 'code'}
	<div class="background">
		<CodePopUp/>
	</div>	
{/if}

{#if latest_popUpState == 'addToPlaylist'}
	<div class="background">
		<AddToPlaylistPopUp/>
	</div>
{/if}

{#if latest_popUpState == 'createSong'}
	<div class="background">
		<CreateSongPopUp/>
	</div>
{/if}

{#if latest_popUpState == 'del'}
	<div class="background">
		<DeleteConfirmPopUp/>
	</div>
{/if}

{#if latest_popUpState == 'updateSong'}
	<div class="background">
		<UpdateSongPopUp/>
	</div>
{/if}

{#if latest_popUpState == 'updatePlaylist'}
	<div class="background">
		<UpdatePlayListPopUp/>
	</div>
{/if}

{#if latest_popUpState == 'newPlayList'}
	<div class="background">
		<NewPlayListPopUp/>
	</div>
{/if}

{#if latest_popUpState == 'createAcc'}
	<div class="background">
		<NewAcountPopUp/>	
	</div>
{/if}

<FootMeny/>

<TailwindSettUp/>


<style>

	main {
		widows: 100%;
		display: flex;
		height: 100%;
		flex-direction: row;
		padding-bottom: 50px;
	}

	div {
		flex: 1;
	}

	.background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>