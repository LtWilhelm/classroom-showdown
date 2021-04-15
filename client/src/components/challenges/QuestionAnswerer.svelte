<script lang="ts">
import { prevent_default } from "svelte/internal";

  import { createEventDispatcher } from "svelte";

  export let index: number;

  const dispatch = createEventDispatcher<{ index: number; answer: string }>();

  let answer = "";
  const answerQuestion = () => {
    dispatch("answer", { index, answer });
  };
</script>

<form>
  <input type="text" bind:value={answer} placeholder="Your answer" />
  <button on:click|preventDefault={answerQuestion}>Check Answer</button>
</form>
