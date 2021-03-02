<script>
    import { set } from '../../Tools/storage';
    import { send } from '../../Tools/crud.js';
    import { popUpState } from '../../Tools/store';

    async function handleSubmit(e) {

        e.preventDefault();

        let email = document.querySelector('input[type="email"]').value;

        var headers = new Headers();
        headers.set('x-api-key', 'awjfiohaiguhseuyg7w7yuhseucuwge7fw78e')

        var formData = new FormData();
        formData.append('email', email)

        let response = await send('http://localhost:8000/login_fetch', {
            method: 'POST',
            headers,
            body: formData
        })

        set('email', email);

        codeInput();

        console.log('login respons: ', response);

    }

    function createAcount() {
        popUpState.update(value => value = 'createAcc')
    }

    function codeInput() {
        popUpState.update(value => value = 'code')
    }

    function close() {
        popUpState.update(value => value = 'none');
    }

</script>


<main class="px-3 w-80 z-50">
    <div class="bg-white">
        <button class=" m-2 float-right w-7 h-7 text-white inline-block text-center transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none" on:click={close}>X</button>
        <div class="px-10 py-6 mb-10 text-center">
            <div class="text-3xl font-bold text-green-500 mb-4">Request login code</div>
        </div>
        <a on:click={createAcount} class="text-xs text-blue-400">Dont have an acount click me!</a>
        <form on:submit={handleSubmit}>
            <input class="w-full text-lg placeholder-black bg-gray-100 p-1" type="email" name="email" placeholder="email">
            <input class="w-full text-lg h-16 text-white font-extrabold bg-green-500" type="submit" value="request">
        </form>
    </div>
</main>