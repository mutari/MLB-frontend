<script>
    import { send } from '../../Tools/crud.js';
    import { popUpState, data } from '../../Tools/store.js';

    async function handleSubmit(e) {

        e.preventDefault();

        let UserData;
        data.subscribe(value => UserData = value);

        var headers = new Headers();
        headers.set('x-api-key', 'awjfiohaiguhseuyg7w7yuhseucuwge7fw78e')

        var formData = new FormData(this);

        let response = await send('http://localhost:8000/api/createPlayList', {
            method: 'POST',
            headers,
            body: formData
        })

        console.log('login respons: ', response);
        if(response.status == 200) {
            popUpState.update(value => value = "none");
            UserData.playlists.push({id: response.response.id, Name: response.response.name, CreatedDate: response.response.createdDate});
            data.update(value => value = UserData);
        }

    }

    function login() {
        popUpState.update(value => value = 'login');
    }

    function close() {
        popUpState.update(value => value = 'none');
    }

</script>

<main class="px-3 w-80 z-50">
    <div class="bg-white">
        <button class=" m-2 float-right w-7 h-7 text-white inline-block text-center transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none" on:click={close}>X</button>
        <div class="px-10 py-6 mb-10 text-center">
            <div class="text-3xl font-bold text-green-500 mb-4">Create a new play list</div>
        </div>
        <form on:submit={handleSubmit}>
            <input class="w-full text-lg placeholder-black bg-gray-100 p-1" type="text" name="name" placeholder="name">
            <input class="w-full text-lg h-16 text-white font-extrabold bg-green-500" type="submit" value="Create PlayList!">
        </form>
    </div>
</main>