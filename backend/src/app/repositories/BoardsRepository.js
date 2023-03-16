const db = require('../../database');

class BoardsRepository {
  // Related to Board
  async findUserById(id) {
    const [row] = await db.query('SELECT id FROM users where id = $1', [id]);
    return row;
  }

  async findBoardById(id) {
    const [row] = await db.query('SELECT id FROM boards where id = $1', [id]);
    return row;
  }

  async createBoard(userId, { name }) {
    const [row] = await db.query(
      `
      INSERT INTO boards(userId, name, created_at) VALUES($1, $2, now())
      RETURNING id
    `,
      [userId, name]
    );
    return row;
  }

  async updateBoard(id, { name }) {
    const [row] = await db.query(
      `
      UPDATE boards SET name = $1 WHERE id = $2
      RETURNING *
    `,
      [name, id]
    );
    return row;
  }

  // Related to column

  async findAllColumnsByBoardId(boardId) {
    const rows = await db.query('SELECT * FROM columns WHERE boardId = $1', [
      boardId,
    ]);
    return rows;
  }

  async findColumnById(id) {
    const [row] = await db.query('SELECT * FROM columns WHERE id = $1', [id]);
    return row;
  }

  async findColumnByBoardId(boardId) {
    const [row] = await db.query('SELECT * FROM columns WHERE id = $1', [
      boardId,
    ]);
    return row;
  }

  async createColumn({ boardId, name, order }) {
    const [row] = await db.query(
      `
      INSERT INTO columns(boardId, name, "order", created_at) VALUES($1, $2, $3,now())
      RETURNING id
    `,
      [boardId, name, order]
    );
    return row;
  }

  async updateColumn(id, { name }) {
    const [row] = await db.query(`UPDATE columns SET name = $1 WHERE id = $2`, [
      name,
      id,
    ]);
    return row;
  }

  async deleteColumn(id) {
    const deleteOp = await db.query('DELETE FROM columns WHERE id = $1', [id]);

    return deleteOp;
  }
}

module.exports = new BoardsRepository();
