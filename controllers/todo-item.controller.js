'use strict';

const todoItemRepository = require('../repositories/todo-item.repository');
const InvalidInputError = require('../utils/invalid-input-error');
const NotFoundError = require('../utils/not-found-error');

const controller = {
  getAll: async (req, res) => {
    try {
      const { activity_group_id } = req.query;
      const data = await todoItemRepository.list(activity_group_id);
      for (const item of data) {
        item.is_active = item.is_active == 1 ? true : false;
      }

      return res.status(200).json({
        status: 'Success',
        message: 'Success',
        data,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }
  },

  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) throw new InvalidInputError('Todo ID is required');

      const [data] = await todoItemRepository.get(id);
      if (!data) throw new NotFoundError('Todo with ID ' + id + ' Not Found');
      data.is_active = data.is_active == 1 ? true : false;

      return res.status(200).json({
        status: 'Success',
        message: 'Success',
        data,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }
  },

  create: async (req, res) => {
    try {
      const { title, activity_group_id, is_active, priority } = req.body;
      if (!title) throw new InvalidInputError('title cannot be null');
      if (!activity_group_id)
        throw new InvalidInputError('activity_group_id cannot be null');

      const dataInput = {
        title,
        activity_group_id,
        is_active: is_active ?? 1,
        priority: priority ?? 'very-high',
      };

      const result = await todoItemRepository.create(dataInput);
      const [data] = await todoItemRepository.get(result.insertId);
      data.is_active = data.is_active == 1 ? true : false;

      return res.status(201).json({
        status: 'Success',
        message: 'Success',
        data,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, priority, is_active } = req.body;

      const dataInput = {
        updated_at: new Date(),
      };

      if (title) dataInput.title = title;
      if (priority) dataInput.priority = priority;
      if (is_active) dataInput.is_active = is_active;

      const [activity] = await todoItemRepository.get(id);
      if (!activity)
        throw new NotFoundError('Todo with ID ' + id + ' Not Found');

      await todoItemRepository.update(dataInput, id);
      const [data] = await todoItemRepository.get(id);
      data.is_active = data.is_active == 1 ? true : false;

      return res.status(200).json({
        status: 'Success',
        message: 'Success',
        data,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const [data] = await todoItemRepository.get(id);
      if (!data) throw new NotFoundError('Todo with ID ' + id + ' Not Found');

      await todoItemRepository.delete(id);
      return res.status(200).json({
        status: 'Success',
        message: 'Success',
        data: {},
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }
  },
};

module.exports = controller;
