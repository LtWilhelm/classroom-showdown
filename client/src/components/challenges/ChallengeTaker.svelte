<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";

  import type { Challenge } from "../../models/Challenge";
  import { User } from "../../models/User";
  import { USER_STORE } from "../../stores/UserStore";
  import { formatSeconds } from "../../utils/formatSeconds";
  import { slimPut } from "../../utils/slimFetch";

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

  let answer = "";

  let score = 50;

  const checkAnswer = (e: Event) => {
    e.preventDefault();

    const regex = new RegExp(challenge.solution);

    if (regex.test(answer)) completeChallenge();
    else Math.max(0, (score -= 10));
  };
  const completeChallenge = async () => {
    clearInterval(interval);
    console.log(score);
    score += Math.floor(50 * (seconds / ((challenge.time || 20) * 60)));
    console.log(score);
    const user = await slimPut("/user/challenge", {
      challengeId: challenge._id,
      score,
    });

    USER_STORE.set(new User(user));
  };

  onDestroy(() => clearInterval(interval));
</script>

<h1>{challenge.name}</h1>
{#if $USER_STORE.scores.find((s) => s.challengeId === challenge._id)}
  <p>You have completed the challenge!</p>
  <p>
    Final Score: {$USER_STORE.scores.find(
      (s) => s.challengeId === challenge._id
    ).score}
  </p>
{:else if started}
  <p>Time: {formatSeconds(seconds)}</p>
  <p>{challenge.description}</p>
  <form>
    <input type="text" bind:value={answer} placeholder="Your answer" />
    <button on:click={checkAnswer}>Check Answer</button>
  </form>
{:else}
  <p>Click start below to start the challenge!</p>
  <button on:click={start}>Start</button>
{/if}
