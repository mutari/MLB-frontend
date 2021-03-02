<script>
    import { send } from '../../Tools/crud';
    import { selectedMenuItem, popUpState, data } from '../../Tools/store';

    let SelectedMenuItem;
    selectedMenuItem.subscribe(value => SelectedMenuItem = value);

    let UserData;
    data.subscribe(value => UserData = value);

    let song = UserData.songs.filter(value => value.id == SelectedMenuItem.id)[0];
    console.log('song:::', song);

    let lyricImage = song.lyrics_image_path;
    let mp3File = song.mp3_path;
    let title = song.title;
    let lyrics = song.lyrics_text;
    
    async function handleSubmit(e) {
    
        e.preventDefault();
    
        var headers = new Headers();
        headers.set('x-api-key', 'awjfiohaiguhseuyg7w7yuhseucuwge7fw78e')
    
        var formData = new FormData(this);
    
        let response = await send('http://localhost:8000/api/updateLyrics', {
            method: 'POST',
            headers,
            body: formData
        })

        UserData.songs = UserData.songs.filter(value => value.id != SelectedMenuItem.id)
        UserData.songs.push(response.song);
        data.update(value => value = UserData);
        selectedMenuItem.update(value => value = {id: response.song.id})

        popUpState.update(value => value = 'none');
    
    }

    function close() {
        popUpState.update(value => value = 'none');
    }

</script>

<main class="px-3 w-2/5 z-50">
    <div class="bg-white">
        <button class=" m-2 float-right w-7 h-7 text-white inline-block text-center transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none" on:click={close}>X</button>
        <div class="px-10 py-6 mb-10 text-center">
            <div class="text-3xl font-bold text-green-500 mb-4">Update song "{title ? title : ''}"</div>
        </div>
        <form on:submit={handleSubmit}>
            <input class="w-full text-lg placeholder-black bg-gray-100 p-1" type="text" name="title" placeholder="title" value={title ? title : ''}>
            <textArea class="w-full text-lg placeholder-black bg-gray-100 p-1" name="textLyrics">{lyrics ? lyrics : ''}</textArea>
            <div class="w-full flex justify-around">
                <label class="w-64">
                    {#if !lyricImage}
                        <div class="w-full  flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-base leading-normal">Select a image/pdf</span>
                        </div>
                    {/if}
                    {#if lyricImage}
                        <div class="w-full  flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <span class="mt-2 text-base leading-normal">Switch imaged?</span>
                        </div>
                    {/if}
                    <input type='file' class="hidden" name="fileLyrics"/>
                </label>
                <label class="w-64">
                    {#if !mp3File}
                        <div class="w-full  flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-base leading-normal">Select a mp3 file</span>
                        </div>
                    {/if}
                    {#if mp3File}
                        <div class="w-full  flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                            <span class="mt-2 text-base leading-normal">Switch mp3?</span>
                        </div>
                    {/if}
                    <input type='file' class="hidden" name="fileMP3"/>
                </label>
            </div>
            <input class="w-full text-lg h-16 text-white font-extrabold bg-green-500" type="submit" value="Update song">
            <input type="text" name="id" value={SelectedMenuItem.id} hidden>
        </form>
    </div>
</main>