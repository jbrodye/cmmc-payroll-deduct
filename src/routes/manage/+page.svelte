<script lang="ts">
  import { page } from '$app/stores';
</script>

<section>
  <h1>Transactions</h1>
  {#each $page.data.transactions.results as { id, employee_id, dollars, cents, time }}
    Transaction: ID {id}, Employee: {employee_id}, Amount: ${dollars}.{cents}, Time: {time}<br>
  {/each}
</section>

<style>
  /* Place styles of your view here */
</style>