<script lang="ts">
  export let showText: boolean = false;
  export let loadingText: string;

  export let loading: boolean;
</script>

{#if loading}
  <loader>
    <p>
      {#if showText || loadingText}
        {loadingText || "Loading..."}
      {/if}
      <loading-bar />
    </p>
    <div class="bg" />
  </loader>
{:else}
  <slot />
{/if}

<style>
  loader {
    width: 100%;
    height: 100%;

    min-height: 4rem;

    overflow: hidden;
    position: relative;

    border-radius: 2rem;
  }

  loader p {
    display: grid;
    place-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    margin: 0;
  }

  .bg {
    background-image: linear-gradient(
      145deg,
      var(--half),
      var(--light) 40%,
      var(--light) 50%,
      var(--half) 60%,
      var(--half)
    );
    height: 100%;
    min-height: 4rem;
    width: 200%;
    z-index: -1;
    animation: loading 5s ease infinite alternate;
  }

  @keyframes loading {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0%);
    }
  }

  loading-bar {
    width: 70%;
    position: relative;
    background-color: var(--light);
  }
  loading-bar,
  loading-bar::before,
  loading-bar::after {
    height: 1rem;
    border-radius: 0.5rem;
  }
  loading-bar::before,
  loading-bar::after {
    content: "";
    position: absolute;
  }
  loading-bar::before {
    background-color: #ffff00aa;
    animation: loading-bar 3.1s ease-in-out alternate infinite;
  }
  loading-bar::after {
    background-color: #ff1070aa;
    animation: loading-bar 3s ease-in-out alternate infinite;
  }

  @keyframes loading-bar {
    0% {
      right: 100%;
      left: 0;
    }
    40% {
      /* right: 100%; */
      left: 0;
    }
    70% {
      /* right: 100%; */
      right: 0;
    }
    100% {
      right: 0;
      left: 100%;
    }
  }
</style>
