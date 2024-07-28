const { Knex } = require("knex");

exports.up = async function (knex) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable("event_catcher", (table) => {
    // this will automatically add a uuid as primary key id for any inserts
    table
      .uuid("uid", { primaryKey: true, useBinaryUuid: true })
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.json("event_payload");
  });
};

exports.down = async function (knex) {
  return knex.schema.dropTable("event_catcher");
};
