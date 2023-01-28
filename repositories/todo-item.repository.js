'use strict';

const conn = require('../utils/connection');

const repository = {
  list: async (id) => {
    const q = `SELECT * FROM todos WHERE activity_group_id = ?`;
    const [rows, fields] = await conn.query(q, [id]);
    return rows;
  },
  get: async (id) => {
    const q = `SELECT * FROM todos WHERE id = ?`;
    const [rows, fields] = await conn.query(q, [id]);
    return rows;
  },
  create: async (data) => {
    const q = `INSERT INTO todos SET ?`;
    const [rows, fields] = await conn.query(q, [data]);
    return rows;
  },
  update: async (data, id) => {
    const q = `
      UPDATE todos
      SET ?
      WHERE id = ?`;
    const [rows, fields] = await conn.query(q, [data, id]);
    return rows;
  },
  delete: async (id) => {
    const q = `
      DELETE FROM todos
      WHERE id = ?`;
    const [rows, fields] = await conn.query(q, [id]);
    return rows;
  },
};

module.exports = repository;
