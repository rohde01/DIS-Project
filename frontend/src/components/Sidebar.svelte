<!-- Sidebar.svelte -->
<script>
    import { writable } from 'svelte/store';
    import UserForm from './UserForm.svelte';
    import UpdateUserForm from './UpdateTeamUsers.svelte';
    import DeleteTeams from './DeleteTeams.svelte';
    import LineChart from './LineChart.svelte';
    import Frontpage from './Frontpage.svelte';

    const components = writable([
        { name: 'Frontpage', component: Frontpage }, 
        { name: 'Onboarding', component: UserForm },
        { name: 'Update customers', component: UpdateUserForm },
        { name: 'Delete Teams', component: DeleteTeams },
        { name: 'Statistics', component: LineChart }
    ]);

    let selectedComponent;
    components.subscribe(value => {
        selectedComponent = value[0];
    });

    let imageUrl = 'https://app.pingodocs.dk/CustomerSpecific/logo.png';
</script>

<div class="w-64 h-screen fixed left-0 top-0 bg-gray-100">
    <div class="flex justify-center mt-4 mb-4">
        <a href="https://www.pingodocs.dk/" target="_blank" class="flex justify-center">
            <img src={imageUrl} alt="Logo" class="w-5/6 h-auto">
        </a>
    </div>
    {#each $components as item (item.name)}
        <div class="p-2 cursor-pointer hover:bg-gray-200 {selectedComponent === item ? 'active' : ''}" on:click={() => (selectedComponent = item)}>
            {item.name}
        </div>
    {/each}
</div>

<svelte:component this={selectedComponent?.component} />

<style>
.active {
    background-color: #ddd;
}
</style>