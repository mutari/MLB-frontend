<script>
    import { send } from '../../Tools/crud.js';
    import { popUpState } from '../../Tools/store.js';

    async function handleSubmit(e) {

        e.preventDefault();

        var headers = new Headers();
        headers.set('x-api-key', 'awjfiohaiguhseuyg7w7yuhseucuwge7fw78e')

        var formData = new FormData(this);

        let response = await send('http://localhost:8000/createAcc', {
            method: 'POST',
            headers,
            body: formData
        })

        console.log('login respons: ', response);
        if(response.status == 69420) popUpState.update(value => value = "none");

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
            <div class="text-3xl font-bold text-green-500 mb-4">request login link</div>
        </div>
        <!-- svelte-ignore a11y-missing-attribute -->
        <a on:click={login} class="text-xs text-blue-400">Login!</a>
        <form on:submit={handleSubmit}>
            <input class="w-full text-lg placeholder-black bg-gray-100 p-1" type="text" name="full_name" placeholder="name">
            <input class="w-full text-lg placeholder-black bg-gray-100 p-1" type="text" name="username" placeholder="username">
            <input class="w-full text-lg placeholder-black bg-gray-100 p-1" type="email" name="email" placeholder="email">
            <input class="w-full text-lg h-16 text-white font-extrabold bg-green-500" type="submit" value="request">
        </form>
    </div>
</main>