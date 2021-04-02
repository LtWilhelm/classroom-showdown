<script lang="ts">
  import Router from "svelte-spa-router";
  import Menu from "./components/menu/Menu.svelte";

  import routes from "./routes";

  let width: number;
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
