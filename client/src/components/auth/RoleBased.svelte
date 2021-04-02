<script lang="ts">
  import { USER_STORE } from "../../stores/UserStore";

  export let roles: string[] = [];
  let user = $USER_STORE;
</script>

{#if user.role === roles[0]}
  <slot name="0" />
{/if}
{#if user.role === roles[1]}
  <slot name="1" />
{/if}
{#if user.role === roles[2]}
  <slot name="2" />
{/if}
{#if user.role === roles[3]}
  <slot name="3" />
{/if}
{#if user.role === roles[4]}
  <slot name="4" />
{/if}
