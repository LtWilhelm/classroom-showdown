<script lang="ts">
  import { onMount } from "svelte";
import Loader from "../components/Loader.svelte";
  import { User } from "../models/User";
  import { USER_STORE } from "../stores/UserStore";
  import { slimGet } from "../utils/slimFetch";

  let users: User[] = [];

  onMount(async () => {
    users = (await slimGet("/api/users")).map((u) => new User(u));
    // .filter((u) => u.role !== "instructor");
  });

  const calculateScore = (u: User) =>
    u.scores.reduce((a, { score: b }) => a + b, 0) / (u.scores.length || 1) +
    u.scores.length * 100;

  type extendedUser = User & { average: number };
  let sorted: extendedUser[];
  $: sorted = [...users]
    .map((u) => {
      const newU: extendedUser = { ...u, average: calculateScore(u) };
      return newU;
    })
    .sort(({ average: a }, { average: b }) => b - a);

  const loadingText = () => {
    const messages = ["Getting participants...", "Loading the winners...", "Generating Leaderboard...", "Making up scores..."];

    const message = messages[Math.floor(Math.random() * messages.length)];
    console.log(message);
    return message;
  }
</script>

<div class="content">
  <Loader loading={users.length === 0} loadingText="">
    <table>
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Score</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {#each sorted as user, i}
          <tr
            class:valid={user.average > 0 && user.scores.length > 0}
            class:you={user._id === $USER_STORE._id}
          >
            <td>{1 + i}</td>
            <td>{user.username}</td>
            <td class="center">{user.average}</td>
            <td class="center">{user.scores.length}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </Loader>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
  }

  table {
    border-collapse: collapse;
  }

  table :is(th, td) {
    border: 10px solid var(--trans);
  }

  thead {
    font-size: 1.5rem;
  }
  th {
    padding: 10px;
  }

  tbody{
    position: relative;
  }

  td.center {
    text-align: center;
  }

  tbody tr.valid:is(:nth-child(1), :nth-child(2), :nth-child(3)) {
    font-weight: bold;
    background-image: linear-gradient(
      to right,
      var(--trans),
      var(--lowlight),
      var(--trans)
    );
    text-shadow: 0 0 10px black;
  }

  tbody tr.valid:first-child {
    background-color: goldenrod;
    font-size: 1.25rem;
  }
  tbody tr.valid:nth-child(2) {
    background-color: silver;
  }
  tbody tr.valid:nth-child(3) {
    background-color: brown;
    border-bottom-width: 1em;
  }

  tbody tr:nth-child(odd) {
    background-image: linear-gradient(
      to right,
      var(--trans),
      var(--lowlight),
      var(--trans)
    );
  }
  
  tbody tr.you{
    background-image: linear-gradient(
      to right,
      #ffffff50,
      var(--trans),
      #ffffff50
    );
    border-radius: 1rem;
    overflow: hidden;
  }

</style>
