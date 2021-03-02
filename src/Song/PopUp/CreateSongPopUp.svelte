<script>
import { subscribe } from 'svelte/internal';


import { send } from '../../Tools/crud';
import { get, set } from '../../Tools/storage';
import { data, popUpState } from '../../Tools/store';

let UserData;
$: data.subscribe(value => UserData = value);

async function handleSubmit(e) {

    e.preventDefault();

    let title = document.querySelector('input[type="text"]');
    let file = document.querySelector('input[name="filelyrics"]');
    let fileMP3 = document.querySelector('input[name="fileMP3"]');
    let textarea = document.querySelector('textArea');

    var headers = new Headers();
    headers.set('x-api-key', 'awjfiohaiguhseuyg7w7yuhseucuwge7fw78e')

    var formData = new FormData(this);

    let response = await send('http://localhost:8000/api/addLyric', {
        method: 'POST',
        headers,
        body: formData
    })

    console.log("songs : ", response.song);

    UserData.songs.push(response.song);
    data.update(value => value = UserData);

    popUpState.update(value => value = '');
}

function close() {
    popUpState.update(value => value = '');
}

</script>

<main class="px-3 w-2/5 z-50">
    <div class="bg-white">
        <button class=" m-2 float-right w-7 h-7 text-white inline-block text-center transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none" on:click={close}>X</button>
        <div class="px-10 py-6 mb-10 text-center">
            <div class="text-3xl font-bold text-green-500 mb-4">Upload</div>
        </div>
        <form on:submit={handleSubmit}>
            <input class="w-full text-lg placeholder-black bg-gray-100 p-1" type="text" name="title" placeholder="title">
            <textArea class="w-full text-lg placeholder-black bg-gray-100 p-1" name="textLyrics" placeholder="lyrics"></textArea>
            <div class="w-full flex justify-around">
                <label class="w-64">
                    <div class="w-full  flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-base leading-normal">Select a image/pdf</span>
                    </div>
                    <input type='file' class="hidden" name="fileLyrics"/>
                </label>
                <label class="w-64">
                    <div class="w-full  flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span class="mt-2 text-base leading-normal">Select a mp3 file</span>
                    </div>
                    <input type='file' class="hidden" name="fileMP3"/>
                </label>
            </div>
            <input class="w-full text-lg h-16 text-white font-extrabold bg-green-500" type="submit" value="Upload song">
        </form>
    </div>
</main>