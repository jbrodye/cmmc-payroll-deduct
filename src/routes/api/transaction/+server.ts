import { json, type RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async function ({ request, platform }) {
  const { op } = await request.json();

  if(op.action == "read") {
    try {
      const result = await platform?.env.DB.prepare('SELECT * FROM transactions ORDER BY id DESC LIMIT ?')
                              .bind(op.data.count)
                              .run();
      
      return json({
        success: true,
        data: result
      });

    } catch (err) {
      return new Response(err, {
        status: 500
      });
    }
  }

  if(op.action == "insert") {
    try {
      const result = await platform?.env.DB.prepare('INSERT INTO transactions (id, employee_id, dollars, cents, tyear, tmonth, tday, thour, tminute) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)')
                              .bind(op.data.employee_id, op.data.dollars, op.data.cents, op.data.tyear, op.data.tmonth, op.data.tday, op.data.thour, op.data.tminute)
                              .run();
      
      return json({
        success: true,
        data: result
      });

    } catch (err) {
      return new Response(err, {
        status: 500
      });
    }
  }

  if(op.action == "delete") {
    try {
      const result = await platform?.env.DB.prepare('DELETE FROM transactions WHERE id = ?')
                              .bind(op.data.transaction_id)
                              .run();
  
      return json({
        success: true,
        data: result
      });
  
    } catch (err) {
      return new Response(err, {
        status: 500
      });
    }
  }
};