<script>
    import { get } from '../../Tools/storage';
    import { send } from '../../Tools/crud.js';
    import { popUpState, user } from '../../Tools/store';

    async function handleSubmit(e) {

        e.preventDefault();

        let code = document.querySelector('input[name="code"]').value;

        var headers = new Headers();
        headers.set('x-api-key', 'awjfiohaiguhseuyg7w7yuhseucuwge7fw78e')

        var formData = new FormData();
        formData.append('code', code)
        formData.append('email', get('email'));

        let response = await send('http://localhost:8000/code', {
            method: 'POST',
            headers,
            body: formData
        })

        console.log('code respons: ', response);

        if(response.status == 200) {
            popUpState.update(value => value = "none");
            user.update(value => value = response.user);
        }

    }

    function close() {
        popUpState.update(value => value = 'none');
    }

</script>

<main class="px-3 w-80 z-50">
    <div class="bg-white">
        <button class=" m-2 float-right w-7 h-7 text-white inline-block text-center transition bg-red-500 rounded-full shadow ripple hover:shadow-lg hover:bg-red-600 focus:outline-none" on:click={close}>X</button>
        <div class="px-10 py-6 mb-10 text-center">
            <div class="text-3xl font-bold text-green-500 mb-4">Login code</div>
        </div>
        <form on:submit={handleSubmit}>
            <input class="w-full text-lg placeholder-black bg-gray-100 p-1" type="text" name="code" placeholder="------" minlength="6" maxlength="6">
            <input class="w-full text-lg h-16 text-white font-extrabold bg-green-500" type="submit" value="request">
        </form>
    </div>
</main>