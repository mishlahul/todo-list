'use strict';

const activityGroupRepository = require('../repositories/activity-group.repository');
const InvalidInputError = require('../utils/invalid-input-error');
const NotFoundError = require('../utils/not-found-error');

const controller = {
  getAll: async (req, res) => {
    try {
      const data = await activityGroupRepository.list();

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
      if (!id) throw new InvalidInputError('Activity ID is required');

      const [data] = await activityGroupRepository.get(id);
      if (!data)
        throw new NotFoundError('Activity with ID ' + id + ' Not Found');

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
      const { title, email } = req.body;
      if (!title) throw new InvalidInputError('title cannot be null');

      const dataInput = {
        title,
        email,
      };

      const result = await activityGroupRepository.create(dataInput);
      const [data] = await activityGroupRepository.get(result.insertId);

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
      const { title } = req.body;
      if (!title) throw new InvalidInputError('title cannot be null');

      const dataInput = {
        title,
        updated_at: new Date(),
      };

      const [activity] = await activityGroupRepository.get(id);
      if (!activity)
        throw new NotFoundError('Activity with ID ' + id + ' Not Found');

      await activityGroupRepository.update(dataInput, id);
      const [data] = await activityGroupRepository.get(id);

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
      const [data] = await activityGroupRepository.get(id);
      if (!data)
        throw new NotFoundError('Activity with ID ' + id + ' Not Found');

      await activityGroupRepository.delete(id);
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
