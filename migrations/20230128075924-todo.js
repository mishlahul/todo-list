'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createTable('activities', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    title: 'string',
    email: 'string',
    created_at: 'timestamp',
    updated_at: 'timestamp',
  });
  db.createTable('todos', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    activity_group_id: 'int',
    title: 'string',
    is_active: 'boolean',
    priority: 'string',
    created_at: 'timestamp',
    updated_at: 'timestamp',
  });
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
