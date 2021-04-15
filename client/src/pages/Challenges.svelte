<script lang="ts">
  import { onMount } from "svelte";
  import ChallengeEditor from "../components/challenges/ChallengeEditor.svelte";
  import ChallengeTaker from "../components/challenges/ChallengeTaker.svelte";
  import Loader from "../components/Loader.svelte";
  import { Challenge } from "../models/Challenge";
  import { USER_STORE } from "../stores/UserStore";
  import { slimGet } from "../utils/slimFetch";

  let challenges: { name: string; _id: string }[] = [];
  onMount(getChallenges);

  let currentChallenge: Challenge;
  let loading = false;
  let locked = false;

  async function select(id: string) {
    if (!locked) {
      loading = true;
      currentChallenge = null;

      currentChallenge = new Challenge(await slimGet(`/api/challenges/${id}`));
      loading = false;
    }
  }

  function addChallenge() {
    challenges = [...challenges, new Challenge()];
  }

  let height = 0;

  async function getChallenges() {
    challenges = [];
    let temp = await slimGet("/api/challenges");

    height = temp.length * 32;

    temp.forEach((c, i) => {
      setTimeout(() => {
        challenges = [...challenges, c];
      }, (800 / temp.length) * i);
    });
  }

  const lock = () => {
    locked = true;
  };
</script>

<div class="content">
  <div class="list" style="min-height: {height}px;">
    <ul class:locked>
      {#each challenges as challenge}
        <li
          class:active={currentChallenge?._id === challenge._id}
          on:click={() => select(challenge._id)}
        >
          {challenge.name}
        </li>
      {/each}
      {#if $USER_STORE.role === "instructor"}
        <li class="add"><button on:click={addChallenge}>Add</button></li>
      {/if}
    </ul>
  </div>
  <Loader {loading} loadingText="Grabbing the thing, be right back...">
    {#if currentChallenge}
      <div>
        {#if $USER_STORE.role === "instructor"}
          <ChallengeEditor
            challenge={currentChallenge}
            on:refresh={getChallenges}
          />
        {:else}
          <ChallengeTaker challenge={currentChallenge} on:lock={lock} />
        {/if}
      </div>
    {:else}
      {"Select a challenge from the left"}
    {/if}
  </Loader>
</div>

<style>
  .content {
    display: grid;
    grid-template-columns: 1fr 5fr;
    column-gap: 1rem;
  }

  div.list {
    /* height: calc(100% - 2rem); */
    height: 100%;

    overflow: auto;
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
    /* box-shadow: 0 0 10px var(--lowlight); */
    padding-left: 10px;

    height: 100%;
    margin: 0;
  }

  ul.locked li {
    color: #aaa;
  }

  li {
    transition: 0.3s;
    margin-left: 0;
    cursor: pointer;

    animation: populate 300ms ease-out 1 forwards;
  }

  ul:not(.locked) li:not(.add):hover {
    margin-left: 10px;
  }

  li.active,
  ul.locked li.active {
    margin-left: 10px;
    /* text-decoration: underline; */
    color: #ddd;
  }

  li.add button {
    /* display: flex;
    align-items: center; */
    margin: 10px 0;
  }

  @keyframes populate {
    0% {
      padding-left: 10px;
      opacity: 0;
    }
    50% {
      padding-left: 20px;
    }
    100% {
      padding-left: 10px;
      opacity: 1;
    }
  }
</style>
