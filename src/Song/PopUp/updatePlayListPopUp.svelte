<script>

    import DragDropList from 'svelte-dragdroplist';
    import { send } from '../../Tools/crud.js';
    import { popUpState, selectedMenuItem, data } from '../../Tools/store.js';

    let SelectedMenuItem;
    selectedMenuItem.subscribe(value => SelectedMenuItem = value);

    let UserData;
    data.subscribe(value => UserData = value);

    let playlist = UserData.playlists.filter(value => value.id == SelectedMenuItem.id)[0];
    if(playlist.songs) playlist.songs = UserData.songs.filter(value => playlist.songs.map(v => v.id).indexOf(value.id) !== -1);
    else playlist.songs = [];
    console.log(playlist);

    playlist.songs.forEach(value => value.text = value.title);


    async function handleSubmit(e) {

        e.preventDefault();

        var headers = new Headers();
        headers.set('x-api-key', 'awjfiohaiguhseuyg7w7yuhseucuwge7fw78e')

        let songOrder = playlist.songs.map(v => v.id);

        var formData = new FormData(this);
        formData.append('songOrder', JSON.stringify(songOrder));
        formData.append('id', SelectedMenuItem.id);

        let response = await send('http://localhost:8000/api/updatePlayList', {
            method: 'POST',
            headers,
            body: formData
        })

        console.log('Update list respons: ', response);
        if(response.status == 200) {
            popUpState.update(value => value = "none")

            let index;
            UserData.playlists.forEach((e, i) => {if(e.id == SelectedMenuItem.id) index = i;});

            UserData.playlists[index].songs = playlist.songs.filter(v => songOrder.indexOf(v.id) !== -1);
            UserData.playlists[index].Name = playlist.Name;
            data.update(value => value = UserData);
        }

    }

    function close() {
        popUpState.update(value => value = 'none');
    }

    $: console.log(playlist.songs);

</script>

<main class="px-3 w-80 z-50">
    <div class="bg-white">
        <button class=" m-2 float-right w-7 h-7 text-white inline-block text-center transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none" on:click={close}>X</button>
        <div class="px-10 py-6 mb-10 text-center">
            <div class="text-3xl font-bold text-green-500 mb-4">Update playlist!</div>
        </div>
        <form on:submit={handleSubmit}>
            <input class="w-full text-lg placeholder-black bg-gray-100 p-1" type="text" name="name" placeholder="change name" bind:value={playlist.Name}>
            <div class="p-1">
                <DragDropList bind:data={playlist.songs} removesItems={true}/>
            </div>
            <input class="w-full text-lg h-16 text-white font-extrabold bg-green-500" type="submit" value="Save!">
        </form>
    </div>
</main>