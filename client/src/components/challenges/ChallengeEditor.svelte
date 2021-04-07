<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { Challenge } from "../../models/Challenge";
  import { slimPost, slimPut } from "../../utils/slimFetch";

  export let challenge: Challenge;

  const dispatch = createEventDispatcher();

  async function save() {
    challenge._id
      ? await slimPut("/api/challenges", challenge)
      : await slimPost("/api/challenges", challenge);

    dispatch("refresh");
  }
</script>

<h1 contenteditable bind:innerHTML={challenge.name} />

<p contenteditable bind:innerHTML={challenge.description} />

<p>
  Students will have
  <input type="number" min="0" bind:value={challenge.time} />
  minutes to complete the challenge.
</p>

<input type="text" bind:value={challenge.solution} placeholder="Solution" />

<button on:click={save}>Save</button>

<style>
  input[type="number"] {
    width: 3rem;
  }
</style>