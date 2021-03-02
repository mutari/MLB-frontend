<script>

    import { get } from '../Tools/storage';
    import { selectedMenuItem, data } from '../Tools/store';
    
    export let title;
    export let lyrics;
    export let image;
    export let mp3;
    
    let SelectedMenuItem;
    $: selectedMenuItem.subscribe(value => SelectedMenuItem = value);

    let latest_data;
    $: data.subscribe(value => latest_data = value);
    
    function Previous() {
    
        let newIndex;
    
        if(SelectedMenuItem.type != 'list') {
            latest_data.songs.forEach((value, index) => {
                if(value.id == SelectedMenuItem.id) {
                    newIndex = index-1
                    if(newIndex < 0) {
                        newIndex = latest_data.songs.length-1;
                    }
                }
            })
    
            if(newIndex != null) selectedMenuItem.update(value => value = {id: latest_data.songs[newIndex].id});
        } else{
            SelectedMenuItem.playlist.songs.forEach((value, index) => {
                if(value.id == SelectedMenuItem.id) {
                    newIndex = index-1
                    if(newIndex < 0) {
                        newIndex = SelectedMenuItem.playlist.songs.length-1;
                    }
                }
            })
    
            if(newIndex != null) 
                selectedMenuItem.update(value => value = {id: SelectedMenuItem.playlist.songs[newIndex].id, type: 'list', playlist: SelectedMenuItem.playlist, action: 'show'});
        }
    
    }
    
    function Next() {
    
        let newIndex;
    
        if(SelectedMenuItem.type != 'list') {
            latest_data.songs.forEach((value, index) => {
                if(value.id == SelectedMenuItem.id) {
                    newIndex = index+1
                    if(newIndex > latest_data.songs.length - 1) {
                        newIndex = 0;
                    }
                }
            })
    
            if(newIndex != null) selectedMenuItem.update(value => value = {id: latest_data.songs[newIndex].id});
        } else{
            SelectedMenuItem.playlist.songs.forEach((value, index) => {
                console.log(value)
                if(value.id == SelectedMenuItem.id) {
                    newIndex = index+1
                    if(newIndex > SelectedMenuItem.playlist.songs.length - 1) {
                        newIndex = 0;
                    }
                }
            })
    
            if(newIndex != null) 
                selectedMenuItem.update(value => value = {id: SelectedMenuItem.playlist.songs[newIndex].id, type: 'list', playlist: SelectedMenuItem.playlist, action: 'show'});
        }
    
    }
    
    </script>
    
    <main class="flex flex-row justify-between w-full">
    
        <button on:click={Previous} class="border border-teal-500 text-green-500 rounded-md font-bold py-4 px-6 mr-2 flex items-center hover:bg-green-500 hover:text-white h-screen">
            <svg class="h-5 w-5 mr-2 fill-current" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="-49 141 512 512" style="enable-background:new -49 141 512 512;" xml:space="preserve">
                <path id="XMLID_10_" d="M438,372H36.355l72.822-72.822c9.763-9.763,9.763-25.592,0-35.355c-9.763-9.764-25.593-9.762-35.355,0 l-115.5,115.5C-46.366,384.01-49,390.369-49,397s2.634,12.989,7.322,17.678l115.5,115.5c9.763,9.762,25.593,9.763,35.355,0 c9.763-9.763,9.763-25.592,0-35.355L36.355,422H438c13.808,0,25-11.193,25-25S451.808,372,438,372z"></path>
            </svg>
            Previous song
        </button>
        
        <div class="w-8/12">
            {#if lyrics}
                <div class="mx-auto max-w-xl">
                    <div class="bg-white shadow-2xl rounded-lg mb-6 tracking-wide">
                        <div class="p-4 mt-2  flex flex-col">
                            <h2 class="font-bold text-2xl text-gray-800 tracking-normal px-2 w-full text-center">{title}</h2>
                            <span class="text-sm text-gray-700 px-2 mr-1" style="white-space: pre-line">
                                {lyrics}
                            </span>
                        </div>
                    </div>
                </div>
            {/if}
    
            {#if image}
                <img src="http://localhost:8000/uploads/{image}" alt={image}>
            {/if}
    
            {#if mp3}
                <audio controls>
                    <source src="http://localhost:8000/sound/{mp3}" type="audio/mpeg"/>
                    <track kind="captions">
                    this browser does not support the audio element.
                </audio>
            {/if}
    
            {#if !image && !lyrics} 
                <div class="mx-auto px-4 py-8 max-w-xl my-20">
                    <div class="bg-white shadow-2xl rounded-lg mb-6 tracking-wide" >
                        <div class="p-4 mt-2">
                            <h2 class="font-bold text-2xl text-gray-800 tracking-normal px-2">Stand By Me<sub>(example text)</sub></h2>
                            <span class="text-sm text-gray-700 px-2 mr-1" style="white-space: pre-line">
                                When the night has come
                                And the land is dark
                                And the moon is the only light we'll see
                                No I won't be afraid
                                Oh, I won't be afraid
                                Just as long as you stand, stand by me
                                So darling, darling
                                Stand by me, oh stand by me
                                Oh stand, stand by me
                                Stand by me
                                If the sky that we look upon
                                Should tumble and fall
                                Or the mountain should crumble to the sea
                                I won't cry, I won't cry
                                No, I won't shed a tear
                                Just as long as you stand, stand by me
                                And darling, darling
                                Stand by me, oh stand by me
                                Oh stand now, stand by me
                                Stand by me
                                Darling, darling
                                Stand by me, oh stand by me
                                Oh stand now, stand by me, stand by me
                                Whenever you're in trouble won't you stand by me
                                Oh stand by me, oh won't you stand now, stand
                                Stand by me...
                            </span>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    
        <button on:click={Next} class="border border-teal-500 text-green-500 rounded-md font-bold py-4 px-6 mr-2 flex items-center hover:bg-green-500 hover:text-white h-screen">
            Next page
            <svg class="h-5 w-5 ml-2 fill-current" clasversion="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="-49 141 512 512" style="enable-background:new -49 141 512 512;" xml:space="preserve">
            <path id="XMLID_11_" d="M-24,422h401.645l-72.822,72.822c-9.763,9.763-9.763,25.592,0,35.355c9.763,9.764,25.593,9.762,35.355,0
                l115.5-115.5C460.366,409.989,463,403.63,463,397s-2.634-12.989-7.322-17.678l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355,0
                c-9.763,9.763-9.763,25.592,0,35.355l72.822,72.822H-24c-13.808,0-25,11.193-25,25S-37.808,422-24,422z"/>
            </svg>
        </button>
    
    </main>
    
    <style>
    
    </style>
    