<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";

  import type { Challenge } from "../../models/Challenge";
  import { User } from "../../models/User";
  import { USER_STORE } from "../../stores/UserStore";
  import { formatSeconds } from "../../utils/formatSeconds";
  import { slimPut } from "../../utils/slimFetch";
import QuestionAnswerer from "./QuestionAnswerer.svelte";

  export let challenge: Challenge;

  const dispatch = createEventDispatcher();

  let started = false;

  let interval;
  let seconds = (challenge.time || 20) * 60;
  const start = () => {
    dispatch("lock");
    started = true;
    interval = setInterval(() => {
      seconds--;
    }, 1000);
  };


  let score = 0;
  let incorrect = false;

  let answeredCorrectly = [];

  const checkAnswer = (idx: number, answer: string) => {

    const question = challenge.questions[idx];
    
    const regex = new RegExp(question.solution);
    
    if (regex.test(answer)) answerCorrect(idx);
    else {
      incorrect = true;
      setTimeout(() => {
        incorrect = false;
      }, 2000);
      // score = Math.max(0, score - 10);
    }
  };
  
  const answerCorrect = (idx: number) => {
    if (!answeredCorrectly.includes(idx)) {
      const question = challenge.questions[idx];
      score += question.score;

      answeredCorrectly = [...answeredCorrectly, idx];
      if (
        answeredCorrectly.sort().every((q, i) => q === i) &&
        answeredCorrectly.length === challenge.questions.length
      )
        completeChallenge();
    }
  };

  let completed = false;
  const completeChallenge = async () => {
    completed = true;
    clearInterval(interval);
    score += Math.floor(50 * (seconds / ((challenge.time || 20) * 60)));
    const user = await slimPut("/user/challenge", {
      challengeId: challenge._id,
      score,
    });

    USER_STORE.update(() => new User(user));
  };

  $: seconds < 0 && clearInterval(interval);

  onDestroy(() => clearInterval(interval));
</script>

<h1>{challenge.name}</h1>
{#if $USER_STORE.scores.find((s) => s.challengeId === challenge._id) || completed}
  <p>You have completed the challenge!</p>
  <p>
    Final Score: {$USER_STORE.scores.find(
      (s) => s.challengeId === challenge._id
    )?.score || score}
  </p>
{:else if started}
  {#if seconds > 0}
    <p>Time: {formatSeconds(seconds)}</p>
  {:else}
    <p>OVERTIME</p>
  {/if}
  <p>{challenge.description}</p>
  {#each challenge.questions as question, i}
    {#if challenge.questions.length > 1}
      <h4>Section {i + 1}</h4>
    {/if}
    <p>{question.description}</p>
    {#if answeredCorrectly.includes(i)}
      <p>You have answered this question correctly.</p>
      {:else}
      <QuestionAnswerer on:answer={({detail: {index, answer}}) => checkAnswer(index, answer)} index={i} />
    {/if}
    {#if incorrect}
      <incorrect>Incorrect!</incorrect>
    {/if}
  {/each}
{:else}
  <p>Click start below to start the challenge!</p>
  <button on:click={start}>Start</button>
{/if}

<style>
  @keyframes incorrect {
    0% {
      opacity: 1;
    }
    10% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  incorrect {
    animation: incorrect 2s linear forwards;
  }
</style>
