<script lang="ts">
  import { fly } from "svelte/transition";
  import Icon from "../Icon.svelte";
  import MenuItem from "./MenuItem.svelte";

  let shown: boolean = false;
  export let width: number;

  const routes = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Leaderboard",
      to: "/leaderboard",
    },
  ];
</script>

<menu class:shown on:click={() => (shown = !shown)}>
  <div class="menu-icon"><Icon icon="black-hole" /></div>

  {#if shown}
    {#if width > 425}
      <ul transition:fly={{ duration: 500, x: -200 }}>
        {#each routes as route}
          <MenuItem to={route.to}>{route.name}</MenuItem>
        {/each}
      </ul>
    {:else}
      <ul transition:fly={{ duration: 500, y: -200 }}>
        {#each routes as route}
          <MenuItem to={route.to}>{route.name}</MenuItem>
        {/each}
      </ul>
    {/if}
  {/if}
</menu>

<style>
  div.menu-icon {
    cursor: pointer;
    font-size: 2em;
    margin: 0;
    background-image: radial-gradient(#654545, #00000000 30%);
    animation: glow 1s ease-in-out normal forwards;
    background-position: 50% 50%;
    width: max-content;
  }

  div.menu-icon:hover {
    background-image: radial-gradient(#454565, #00000000 30%);
  }

  :not(.shown) div.menu-icon {
    animation: glow 3s ease-in-out infinite alternate;
    text-align: center;
  }

  @keyframes glow {
    from {
      background-size: 100% 100%;
    }
    to {
      background-size: 200% 200%;
    }
  }

  menu {
    flex-basis: 5%;
    transition: 500ms;
    padding: 0 20px;
    margin: 0;
  }

  menu.shown {
    flex-basis: 10%;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  @media only screen and (max-width: 425px) {
    menu,
    menu.shown {
      flex-basis: 100%;
    }
  }
</style>
