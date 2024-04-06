import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async function ({ platform }) {
  const queryResult = await platform?.env.DB.prepare('SELECT * FROM transactions').run();

  return json(queryResult);
}

export const POST: RequestHandler = async function ({ request, platform }) {
  const { employee_id, dollars, cents, tyear, tmonth, tday, thour, tminute } = await request.json();

  try {
    await platform?.env.DB.prepare('INSERT INTO transactions (id, employee_id, dollars, cents, tyear, tmonth, tday, thour, tminute) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)')
                            .bind(employee_id, dollars, cents, tyear, tmonth, tday, thour, tminute)
                            .run();
    
      return json({
        success: true
      });

  } catch (err) {
    return new Response(err, {
      status: 500
    });
  }
};

export const DELETE: RequestHandler = async function ({ request, platform }) {
  const { transaction_id } = await request.json();

  try {
    await platform?.env.DB.prepare('DELETE FROM transactions WHERE id = ?')
                            .bind(transaction_id)
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