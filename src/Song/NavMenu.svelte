<script>

    import { send } from '../Tools/crud.js';
    import { data, selectedMenuItem, state, user, popUpState } from '../Tools/store.js';
    
    let hide = true;
    
    let latest_user;

    var headers = new Headers();
    headers.set('x-api-key', 'awjfiohaiguhseuyg7w7yuhseucuwge7fw78e')
    
	//get all the users data like songs and playlists
    let UserData;
    user.subscribe(value => {
        latest_user = value;
        if(value.username) {
			console.log('aiwdfja')
            UserData = send('http://localhost:8000/api/get/all', {
                nethod: 'GET',
                headers
            });

            UserData.then(value => data.update(v => v = value))

        } else {
            UserData = null
        };
    });

    let search;
    let searchData;

    $: {
        if(search) {
            console.log(search);
            let fuse = new Fuse(UserData.songs, { includeScore: true, keys: ['title'] });
            searchData = fuse.search(search);
            searchData = searchData.filter(value => value.score <= 0.7).map(value => value.item.id)
        } else {
            searchData = undefined;
        }
    }

    $: data.subscribe(value => UserData = value);
    
    function show(id) {
        state.update(state => state = 'show');
        selectedMenuItem.update(value => value = {id: id, action: 'show'});
    }

    function del(id) {
        console.log('test')
        popUpState.update(value => value = "del");
        selectedMenuItem.update(value => value = {id: id, action: 'del'});
    }
    
    function delPlaylist(id) {
        popUpState.update(value => value = "del");
        selectedMenuItem.update(value => value = {id: id, type: "list", action: 'del'});
    }
    
    function save(id) {
        console.log(id);
    }
    
    function CreatePlayList() {
        popUpState.update(value => value = "newPlayList");
    }
    
    function addToPlaylist(id) {
        popUpState.update(value => value = "addToPlaylist");
        selectedMenuItem.update(value => value = {id: id, action: 'addToPlaylist'})
    }
    
    function play(id) {
        let playlist = UserData.playlists.filter(value => value.id == id)[0];
        if(playlist.songs) {
            let songId = playlist.songs[0];
            state.update(state => state = 'show');
            selectedMenuItem.update(value => value = {id: songId.id, type: 'list', playlist: playlist, action: 'show'});
        }
    }
    
    let DropDown = [];
    function OpenDropDown(id) {
        let playlist = UserData.playlists.filter(value => value.id == id)[0];
        if(playlist.songs) DropDown[id] = !DropDown[id];
        else DropDown[id] = false;
    }
    
    function CreateSong() {
        popUpState.update(state => state = 'createSong')
    }
    
    function editSong(id) {
        popUpState.update(value => value = 'updateSong');
        selectedMenuItem.update(value => value = {id: id, action: 'edit'});
    }
    
    function editPlayList(id) {
        popUpState.update(value => value = 'updatePlaylist');
        selectedMenuItem.update(value => value = {id: id, action: 'edit'});
    }
    
    </script>
    
    {#if !hide}
        <nav>
            <button class=" w-7 h-7 text-white inline-block text-center transition bg-green-500 rounded-full shadow ripple hover:shadow-lg hover:bg-green-600 focus:outline-none" on:click={() => hide = !hide}>O</button>
        </nav>
    {/if}
    
    {#if hide && latest_user.username}
        <div class="overflow-hidden fixed shadow-lg border-t-4 bg-white mb-4 rounded-b-lg rounded-t border-red-light w-full md:w-1/6 m-2">
            <div class="px-4 py-1 mb-2 mt-3">
                <div class="flex flex-row justify-between">
                    <div class="text-4xl">{latest_user.username}</div>
                    <button class=" w-7 h-7 text-white inline-block text-center transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none" on:click={() => hide = !hide}>X</button>
                </div>
                {#if UserData}
                    {#await UserData}
                        <p>...waiting</p>
                    {:then data} 
                        <div class="flex flex-row mb-2 mt-3 justify-between">
                            <div class="tracking-wide text-c2">Songs</div>
                            <div on:click={CreateSong}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 20 20" fill="green">
                                    <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div class="flex relative justify-between cursor-pointer text-lg text-grey-darkest">
                            <input class="border-2 border-gray-300 bg-white w-full"
                              type="search" name="search" placeholder="Search" bind:value={search}>
                            <button type="submit" class="absolute right-0 top-0 m-2 mx-3 border-none">
                              <svg class="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                                viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
                                width="512px" height="512px">
                                <path
                                  d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                              </svg>
                            </button>
                        </div>
                        {#each data.songs as song}
                            {#if song.title && (!searchData || searchData.indexOf(song.id) !== -1)}
                                <div class="flex justify-between cursor-pointer border px-2 py-1 text-lg text-grey-darkest border-b-0 {selectedMenuItem.id == song.id ? 'selected' : ''}">
                                    <div on:click={() => show(song.id)}>{song.title}</div>
                                    <div class="flex flex-row">
                                        <div on:click={() => del(song.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="red">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div on:click={() => addToPlaylist(song.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="blue">
                                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                            </svg>
                                        </div>
                                        <div on:click={() => editSong(song.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor">
                                                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            {/if}
                        {/each}
                        <div class="flex flex-row mb-2 mt-3 justify-between">
                            <div class="tracking-wide text-c2">Play Lists</div>
                            <div on:click={CreatePlayList}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 20 20" fill="green">
                                    <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        {#each data.playlists as playlist}
                            {#if playlist.Name}
                                <div class="flex flex-col justify-between cursor-pointer border px-2 py-1 text-lg text-grey-darkest border-b-0">
                                    <div class="flex flex-row justify-between">
                                        <div on:click={() => play(playlist.id)}>{playlist.Name}</div>
                                        <div class="flex flex-row">
                                            <div on:click={() => delPlaylist(playlist.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="red">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div on:click={() => OpenDropDown(playlist.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <div on:click={() => editPlayList(playlist.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    {#if DropDown[playlist.id]}
                                        <div class="flex flex-col justify-between cursor-pointer border px-2 py-1 text-lg text-grey-darkest border-b-0">
                                            {#each playlist.songs as song}
                                                <div>{UserData.songs.filter(s => s.id == song.id)[0].title}</div>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>
                            {/if}
                        {/each}
                    {/await}
                {/if}
            </div>
        </div>
    {/if}
    
    <style>
        
        .selected {
            border-left: 4px solid #e2624b !important;
        }
    
    </style>