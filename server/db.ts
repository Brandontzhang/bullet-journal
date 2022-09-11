const sql = require("mssql");

class db {
  dbConfig = {
    server : "bullet-journal2.database.windows.net",
    database : "BulletJournal",
    user : "bzhang",
    password : "Captain1",
    port : 1433,
    options : {
      encrypt: true
    }
  }
  
  conn = new sql.ConnectionPool(this.dbConfig);

  query = async (whereClause : string) => {
    await this.conn.connect();
    const req = new sql.Request(this.conn);
    const res = await req.query(whereClause);
    return res.recordset;
  }
}

export default new db();