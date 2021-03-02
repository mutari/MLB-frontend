<script>
    import { get, set } from '../../Tools/storage';
    import { send } from '../../Tools/crud.js';
    import { popUpState, selectedMenuItem, data } from '../../Tools/store';

    let UserData;
    data.subscribe(value => UserData = value);

    async function addLyrics(id) {

        let SelectedMenuItem;
        selectedMenuItem.subscribe(value => SelectedMenuItem = value);

        var headers = new Headers();
        headers.set('x-api-key', 'awjfiohaiguhseuyg7w7yuhseucuwge7fw78e')

        var formData = new FormData();
        formData.append('PlayListID', id);
        formData.append('songID', SelectedMenuItem.id);

        let response = await send('http://localhost:8000/api/addSongToPlaylist', {
            method: 'POST',
            headers,
            body: formData
        })

        console.log('add to playlist respons: ', response);

        if(response.status == 200) {
            popUpState.update(value => value = "none");

            let index;
            UserData.playlists.forEach((e, i) => {if(e.id == id) index = i;});

            if(!UserData.playlists[index].songs) UserData.playlists[index].songs = []
            UserData.playlists[index].songs.push({id: SelectedMenuItem.id});

            console.log('UserData 2:: ', UserData);
            data.update(value => value = UserData)
        }

    }

    function close() {
        popUpState.update(value => value = 'none');
    }

</script>

<main class="px-3 w-80 z-50">
    <div class="bg-white">
        <button class=" m-2 float-right w-7 h-7 text-white inline-block text-center transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none" on:click={close}>X</button>
        <div class="px-10 py-6 mb-10 text-center">
            <div class="text-3xl font-bold text-green-500 mb-4">Add song to playlist</div>
        </div>
        <form>
            {#each UserData.playlists as playlist}
                <div on:click={() => addLyrics(playlist.id)} class="w-full text-lg h-16 text-white font-extrabold bg-green-500 text-center align-middle inline-block border-white border-1">{playlist.Name}</div>
            {/each}
        </form>
    </div>
</main>