<script lang="ts">
  import { onMount } from "svelte";

  import Router from "svelte-spa-router";
  import Menu from "./components/menu/Menu.svelte";
  import { User } from "./models/User";

  import routes from "./routes";
  import { USER_STORE } from "./stores/UserStore";
  import { slimGet } from "./utils/slimFetch";

  let width: number;

  onMount(resume);

  async function resume() {
    try {
      const user = await slimGet("/user/resume");
      // console.log(user);

      if (user) USER_STORE.set(new User(user));
    } catch (e) {
      // window.location.pathname = "/#/signup";
      console.log(e);
    }
  }
</script>

<main bind:clientWidth={width}>
  <Menu {width} />
  <div>
    <Router {routes} />
  </div>
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    /* background-color: #00000080; */
    /* background-image: linear-gradient(165deg, #00000080, #00000080 40%, var(--bg) 40%); */
    margin: 0;

    overflow: auto;
    /* backdrop-filter: blur(10px); */
    display: flex;
  }
  div {
    padding: 1rem 2rem;
    /* margin: 1.5em; */
    flex: 1;
  }

  @media only screen and (max-width: 420px) {
    main {
      display: block;
    }
  }
</style>
