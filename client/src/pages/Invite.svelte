<script lang="ts">
import { onMount } from "svelte";
import { slimGet } from "../utils/slimFetch";

  let code: string;
  onMount(async () => {
    code = await (await fetch('/api/invite')).text();
  })
</script>

<div class="content">
  <h2>Invite Code:</h2>
  <p>{code || 'Generating Code...'}</p>
</div>
