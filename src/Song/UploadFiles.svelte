<script>

import { send } from '../Tools/crud.js';

async function handleSubmit(e) {

    let title = document.querySelector('input[type="text"]');
    let file = document.querySelector('input[type="file"]');
    let textarea = document.querySelector('textArea');

    e.preventDefault();

    var headers = new Headers();
    headers.set('x-api-key', 'awjfiohaiguhseuyg7w7yuhseucuwge7fw78e')

    var formData = new FormData();
    formData.append('title', title.value)
    formData.append('textLyrics', textarea.value)
    formData.append('fileLyrics', file.files[0])

    let response = await send('http://mylyricbook/api/addLyric', {
        method: 'POST',
        headers,
        body: formData
    })

    console.log(response);

}
/*
function onFileUploadeChange(e) {
    console.log(e.target.files)
    let files = e.target.files;

    let div = document.querySelector('#fileArray');

    let latest = document.querySelector(`#number-${numberOfUploades}`);
    if(latest.querySelector('input[type="text"]').value == "" && latest.querySelector('input[type="file"]').files.length == 0 && latest.querySelector('textArea').value == "") {
        numberOfUploades--;
        latest.remove();
    }

    for(var i = 0; i < files.length; i++) {
        numberOfUploades++;
        div.append(addNewUploadeField(files[i]));
    }

}
*/
</script>

<form on:submit={handleSubmit}>
<!--
    <input type="file" name="files" on:change={onFileUploadeChange} multiple>
-->
    <div id="fileArray">
        <input type="text" name="title" placeholder="title">
        <textArea name="text"></textArea>
        <input type="file" name="filelyrics">
        <input type="submit" value="upload">
    </div>

</form>

<style>
    #fileArray {
        display: flex;
        flex-direction: column;
    }
</style>