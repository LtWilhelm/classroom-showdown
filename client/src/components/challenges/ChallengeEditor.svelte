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

  const addQuestion = () => {
    challenge = challenge.addQuestion();
  };
</script>

<h1 contenteditable bind:innerHTML={challenge.name} />

<p contenteditable bind:innerHTML={challenge.description} />

<p>
  Students will have
  <input type="number" min="0" bind:value={challenge.time} />
  minutes to complete the challenge.
</p>

{#each challenge.questions as question, i}
  <h4>Question {i + 1}</h4>
  <p contenteditable bind:innerHTML={question.description} />
  <input type="text" bind:value={question.solution} placeholder="Solution" /><br
  />
  <p>
    Students will earn
    <input type="number" bind:value={question.score} />
    points for answering this question correctly.
  </p>
{/each}

<button on:click={addQuestion}>Add Question</button>
<button on:click={save}>Save</button>

<style>
  input[type="number"] {
    width: 3rem;
  }
</style>
