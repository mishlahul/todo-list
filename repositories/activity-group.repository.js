'use strict';

const conn = require('../utils/connection');

const repository = {
  list: async () => {
    const q = `SELECT * FROM activities`;
    const [rows, fields] = await conn.query(q);
    return rows;
  },
  get: async (id) => {
    const q = `SELECT * FROM activities WHERE id = ?`;
    const [rows, fields] = await conn.query(q, [id]);
    return rows;
  },
  create: async (data) => {
    const q = `INSERT INTO activities SET ?`;
    const [rows, fields] = await conn.query(q, [data]);
    return rows;
  },
  update: async (data, id) => {
    const q = `
      UPDATE activities
      SET ?
      WHERE id = ?`;
    const [rows, fields] = await conn.query(q, [data, id]);
    return rows;
  },
  delete: async (id) => {
    const q = `
      DELETE FROM activities
      WHERE id = ?`;
    const [rows, fields] = await conn.query(q, [id]);
    return rows;
  },
};

module.exports = repository;
