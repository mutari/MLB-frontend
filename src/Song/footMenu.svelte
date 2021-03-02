<script>

    import { state, user, popUpState } from '../Tools/store';
    import { send } from '../Tools/crud';

    let User;

    $: user.subscribe(value => User = value)

    function upload() {
        popUpState.update(state => state = 'createSong');
    }

    function fullPage() {
        state.update(state => state = "show");
    }

    function login() {
        popUpState.update(value => value = "login");
    }

    async function logout() {
        var headers = new Headers();
        headers.set('x-api-key', 'awjfiohaiguhseuyg7w7yuhseucuwge7fw78e');

        console.log('hello wrold');

        let response = await send('http://localhost:8000/logout', {
            method: 'GET',
            headers
        }) 

        console.log("respons:", response);

        //test if you are not loged in anymore! if status == 403 then you are not loged in
        if(response.status == 403) {
            user.update(value => value = {});
            popUpState.update(value => value = "notLogedIn");
        }
    }

    async function test() {

        var headers = new Headers();
        headers.set('x-api-key', 'awjfiohaiguhseuyg7w7yuhseucuwge7fw78e')

        let response = await send('http://localhost:8000/test', {
            method: 'GET',
            headers
        })

        console.log(response);
    }

</script>

<footer class="absolute bottom-0 w-full flex flex-row justify-center">
    <button class="m-2 border-b border-gray-600" on:click={fullPage}>
        full page
    </button>
    <button class="m-2 border-b border-gray-600" on:click={upload}>
        Upload
    </button>

    {#if !User.username}
        <button class="m-2 border-b border-gray-600" on:click={login}>
            Login
        </button>
    {:else}
        <button class="m-2 border-b border-gray-600" on:click={ logout }>
            Logout
        </button>
    {/if}
    <button class="m-2 border-b border-gray-600" on:click={test}>
        test button
    </button>
</footer>

<style>

</style>