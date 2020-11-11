
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl=>{
      tbl.increments()
      tbl.string('username', 20).notNullable()
      tbl.string('password', 20).notNullable(),
      tbl.string('department', 20)
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('users')
};
