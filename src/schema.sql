DROP TABLE transactions;

CREATE TABLE IF NOT EXISTS transactions (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	employee_id INTEGER,
	dollars INTEGER DEFAULT 0,
	cents INTEGER DEFAULT 0,
	tyear INTEGER,
	tmonth INTEGER,
	tday INTEGER,
	thour INTEGER,
	tminute INTEGER
);