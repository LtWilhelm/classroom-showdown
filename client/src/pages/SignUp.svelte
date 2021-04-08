<script lang="ts">
  import { push } from "svelte-spa-router";

  import { User } from "../models/User";

  import { USER_STORE } from "../stores/UserStore";
  import { slimGet, slimPost } from "../utils/slimFetch";

  let firstName: string = "";
  let lastName: string = "";
  let inviteCode: string = "";

  async function signUp(e: Event) {
    e.preventDefault();
    inviteCode
      ? await slimPost("/user/signup", {
          username: `${firstName} ${lastName}`,
          inviteCode,
        })
      : await slimPost("/user/signin", {
          username: `${firstName.trim()} ${lastName.trim()}`,
        });
    const user = await slimGet("/user/resume");

    USER_STORE.set(new User(user));

    push("/");
  }
</script>

<div>
  <form class="content">
    <div>
      <input type="text" placeholder="First Name" bind:value={firstName} />
      <input type="text" placeholder="Last Name" bind:value={lastName} />
    </div>
    <input type="text" placeholder="Invitation Code" bind:value={inviteCode} />
    <small
      >If you already have an account, the Invitation Code is not required</small
    >
    <hr />
    <button on:click={signUp}>
      {`Sign ${inviteCode ? "Up" : "In"}`}
    </button>
  </form>
</div>

<style>
  div {
    width: 100%;
    display: grid;
    place-items: center;
  }

  form {
    max-width: 400px;
    text-align: center;
    padding-top: 2rem;
  }

  form div {
    display: flex;
    justify-content: space-between;
  }

  input:first-child {
    margin-right: 10px;
  }
  input {
    flex: 1;
  }
  input[placeholder="Invitation Code"] {
    width: 100%;
  }
</style>
