<script>
    import { popUpState } from '../../Tools/store';

    function login() {
        popUpState.update(value => value = "login");
    }

    function newAcc() {
        popUpState.update(value => value = "createAcc");
    }

</script>



<main class="px-3 w-80 z-50">
    <div class="bg-white">
        <div class="px-10 py-6 mb-10 text-center">
            <div class="text-3xl font-bold text-green-500 mb-4">My Lyrics Book</div>
            <span class="text-mb">Välkomen till MLB</span>
        </div>
        <button class="w-full text-lg h-16 text-white font-extrabold bg-red-500" on:click={login}>Login</button>
        <button class="w-full text-lg h-16 text-white font-extrabold bg-green-500" on:click={newAcc}>New User</button>
    </div>
</main>