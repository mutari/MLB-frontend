<script>

function handleSubmit(e) {
    e.preventDefault();
    console.log(e)
}

function onFileUploadeChange(e) {
    console.log(e.target.files)
    let files = e.target.files;

    let div = document.querySelector('#fileArray');
    for(var i = 0; i < files.length; i++) {
        console.log(files[i]);
        let newDiv = document.createElement('div');
        let input = document.createElement('input');
        input.setAttribute('type', 'text')
        input.setAttribute('name', 'title')
        input.setAttribute('placeholder', 'title')
        newDiv.append(input);
        input = document.createElement('textArea');
        input.setAttribute('name', 'text')
        newDiv.append(input);
        div.append(newDiv)
        input = document.createElement('input');
        input.setAttribute('type', 'file')
        input.setAttribute('name', 'file')
        newDiv.append(input);

        /**
         * document.createElement('div').innerHTML = `<input type="text" name="title" placeholder="title">
            <input type="file" name="file">
            <textArea name="text"></textArea>`
        */
    }

}

</script>

<form on:submit={handleSubmit}>

    <input type="file" name="files" on:change={onFileUploadeChange} multiple>

    <div id="fileArray">
        <div>
            <input type="text" name="title" placeholder="title">
            <textArea name="text"></textArea>
            <input type="file" name="file">
        </div>
    </div>

</form>

<style>
    #fileArray {
        display: flex;
        flex-direction: column;
    }
</style>