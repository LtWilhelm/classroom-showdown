<script lang="ts">
  export let showText: boolean = false;
  export let loadingText: string;
</script>

<loader>
  <p>
    {#if showText || loadingText}
      {loadingText || "Loading..."}
    {/if}
  </p>
  <div class="bg" />
</loader>

<style>
  loader {
    width: 100%;
    height: 100%;

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
  }

  .bg {
    background-image: linear-gradient(
      145deg,
      var(--half),
      var(--lowlight) 40%,
      var(--lowlight) 50%,
      var(--half) 60%,
      var(--half)
    );
    height: 100%;
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
</style>
