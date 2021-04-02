<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "../components/Loader.svelte";
  import { Challenge } from "../models/Challenge";
import { USER_STORE } from "../stores/UserStore";
  import { slimGet } from "../utils/slimFetch";

  let challenges: { name: string; _id: string }[] = [];
  onMount(async () => (challenges = await slimGet("/api/challenges")));

  let currentChallenge: Challenge;
  let loading = false;
  async function select(id: string) {
    loading = true;
    currentChallenge = null;

    currentChallenge = new Challenge(await slimGet(`/api/challenges/${id}`));
    loading = false;
  }
</script>

<div class="content">
  <ul>
    {#each challenges as challenge}
      <li on:click={() => select(challenge._id)}>{challenge.name}</li>
    {/each}
    {#if $USER_STORE.role = 'instructor'}
      <li><button>Add</button></li>
    {/if}
  </ul>
  {#if currentChallenge}
    <div>
      {currentChallenge?.description ?? "Select a challenge from the left"}
    </div>
  {:else if loading}
    <Loader loadingText="Grabbing the thing, be right back..." />
  {:else}
    {"Select a challenge from the left"}
  {/if}
</div>

<style>
  .content {
    display: grid;
    grid-template-columns: 1fr 7fr;
    column-gap: 1rem;
  }
  ul {
    background-image: linear-gradient(
      to bottom,
      var(--trans),
      var(--lowlight),
      var(--trans)
    );
    list-style: none;
    line-height: 2rem;
    user-select: none;
    box-shadow: 0 0 10px var(--lowlight);
  }

  li {
    transition: 0.3s;
    margin-left: 0;
    cursor: pointer;
  }
  li:hover {
    margin-left: 10px;
  }
</style>
