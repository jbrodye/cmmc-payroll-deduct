<script lang="ts">
  import { page } from '$app/stores';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';

  async function deleteTransaction(id) {
    const response = await fetch("/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        "op": {
          "action": "delete",
          "data": {
            "transaction_id": id
        }
    }
})
    });

    const data = await response.json();
    
    if(data && data.success == true) {
        location.reload();
    }
  }
</script>

<section>
  <center><b>TRANSACTION HISTORY</b></center>
  <br />
  <div class="transactionTable">
    <Table shadow striped={true} hoverable={true}>
      <TableHead>
        <TableHeadCell>Transaction ID</TableHeadCell>
        <TableHeadCell>Employee ID</TableHeadCell>
        <TableHeadCell>Amount</TableHeadCell>
        <TableHeadCell>Time</TableHeadCell>
        <TableHeadCell>Actions</TableHeadCell>
      </TableHead>
      <TableBody class="divide-y">
      {#each $page.data.transactions.results as { id, employee_id, dollars, cents, tyear, tmonth, tday, thour, tminute }}
        <TableBodyRow>
          <TableBodyCell>{id}</TableBodyCell>
          <TableBodyCell>{employee_id}</TableBodyCell>
          <TableBodyCell>${dollars}.{cents.toString().padStart(2, "0")}</TableBodyCell>
          <TableBodyCell>{tday.toString().padStart(2, "0")}/{tmonth.toString().padStart(2, "0")}/{tyear} {thour.toString().padStart(2, "0")}:{tminute.toString().padStart(2, "0")}</TableBodyCell>
          <TableBodyCell>
            <button on:click={deleteTransaction(id)} data-sveltekit-reload>Delete Transaction</button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
      </TableBody>
    </Table>
  </div>
</section>

<style>
  :global(body) {
    margin-top: 16px;
  }

  div.transactionTable {
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
  }
</style>