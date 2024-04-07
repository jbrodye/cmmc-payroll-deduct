import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function ({ platform }) {
  const queryResult = await platform?.env.DB.prepare('SELECT * FROM transactions').run();

  return json(queryResult);
}

export const POST: RequestHandler = async function ({ request, platform }) {
  const { op } = await request.json();

  if(op.action == "insert") {
    try {
      await platform?.env.DB.prepare('INSERT INTO transactions (id, employee_id, dollars, cents, tyear, tmonth, tday, thour, tminute) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)')
                              .bind(op.data.employee_id, op.data.dollars, op.data.cents, op.data.tyear, op.data.tmonth, op.data.tday, op.data.thour, op.data.tminute)
                              .run();
      
      return json({
        success: true
      });

    } catch (err) {
      return new Response(err, {
        status: 500
      });
    }
  }

  if(op.action == "delete") {
    try {
      await platform?.env.DB.prepare('DELETE FROM transactions WHERE id = ?')
                              .bind(op.data.transaction_id)
                              .run();
  
      return json({
        success: true
      });
  
    } catch (err) {
      return new Response(err, {
        status: 500
      });
    }
  }
};