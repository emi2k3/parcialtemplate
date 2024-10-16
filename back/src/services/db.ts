import pg from "pg";

const { Pool } = pg;
const pool = new Pool();
export const query = async (text: string, params?: (string | number | string[] | number[])[]) => {
    // const start = Date.now()
    const res = await pool.query(text, params)
    // const duration = Date.now() - starts
    // console.log('executed query', { text, duration, rows: res.rowCount })
    return res
}

export default pool;
