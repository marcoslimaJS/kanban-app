const BoardsRepository = require('../repositories/BoardsRepository');

class BoardController {
  async createBoardWithColumns(request, response) {
    const { userId } = request.params;
    const { name, columns } = request.body;
    const userIdExists = await BoardsRepository.findUserById(userId);
    if (!userIdExists) {
      response
        .status(400)
        .json({ error: 'User not found when trying to create board' });
    }
    if (!name) {
      response.status(400).json({ error: 'Name is required' });
    }

    const boardId = await BoardsRepository.createBoard(userId, { name });

    if (!boardId) {
      response.status(400).json({ error: 'Error creating board' });
    }

    for (const [index, name] of columns.entries()) {
      await BoardsRepository.createColumn({
        boardId: boardId.id,
        name,
        order: parseInt(index) + 1,
      });
    }

    response.send({ msg: 'Board created successfully' });
  }

  async updateBoardWithColumns(request, response) {
    const { boardId } = request.params;
    const { name, columns } = request.body;
    const boardExists = await BoardsRepository.findBoardById(boardId);

    if (!boardExists) {
      response.status(404).json({ error: 'Board not found' });
    }
    if (!name) {
      response.status(400).json({ error: 'Name is required' });
    }
    await BoardsRepository.updateBoard(boardId, { name });

    const allColumnsOfBoard = await BoardsRepository.findAllColumnsByBoardId(
      boardId
    );
    const columnsId = columns.map(({ id }) => id);

    // Remove a coluna caso ela exista no banco e não exista na requisição
    // pois isso quer dizer que o usuario removeu a coluna.
    for (const [i, { id }] of allColumnsOfBoard.entries()) {
      !columnsId.includes(id) && (await BoardsRepository.deleteColumn(id));
    }

    //Verifica se a coluna ja existe pelo id e atualiza, se não existir então cria.
    for (const [index, column] of columns.entries()) {
      if (column.id) {
        const columnExists = await BoardsRepository.findColumnById(column.id);
        columnExists &&
          (await BoardsRepository.updateColumn(column.id, {
            name: column.name,
          }));
      } else {
        await BoardsRepository.createColumn({
          boardId,
          name: column.name,
          order: parseInt(index) + 1,
        });
      }
    }

    response.send({ msg: 'Board updated successfully' });
  }

  
}

module.exports = new BoardController();
