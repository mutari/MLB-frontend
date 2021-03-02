<script>
    import { set, get } from '../../Tools/storage';
    import { send } from '../../Tools/crud.js';
    import { popUpState, selectedMenuItem, data } from '../../Tools/store';


    let selected_song;
    $: selectedMenuItem.subscribe(value => selected_song = value);

    let UserData;
    data.subscribe(v => UserData = v);

    async function sendDelRequest() {
        var headers = new Headers();
        headers.set('x-api-key', 'awjfiohaiguhseuyg7w7yuhseucuwge7fw78e')

        let response = await send(`http://localhost:8000/api/del${selected_song.type == 'list' ? 'PlayList' : ''}/`+selected_song.id, {
            method: 'POST',
            headers
        })

        console.log('del respons, ', response);

        if(response.status == 200) {
            if(selected_song.type != 'list') UserData.songs = UserData.songs.filter(v => v.id != selected_song.id)
            else UserData.playlists = UserData.playlists.filter(v => v.id != selected_song.id)
            data.update(v => v = UserData);
        }

    }

    function delOk() {
        sendDelRequest();
        popUpState.update(value => value = "none");
    }

    function delKo() {
        popUpState.update(value => value = "none");
    }

    function close() {
        popUpState.update(value => value = 'none');
    }

</script>


<main class="px-3 w-80 z-50">
    <div class="bg-white">
        <button class=" m-2 float-right w-7 h-7 text-white inline-block text-center transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none" on:click={close}>X</button>
        <div class="px-10 py-6 mb-10 text-center">
            <div class="text-3xl font-bold text-green-500 mb-4">Delete {selected_song.type == 'list' ? 'playlist' : 'song'} id: {selected_song.id}</div>
        </div>
        <div>
            <button on:click={delOk} class="w-full text-lg h-16 text-white font-extrabold bg-green-500">ok</button>
            <button on:click={delKo} class="w-full text-lg h-16 text-white font-extrabold bg-red-500">ko</button>
        </div>
    </div>
</main>