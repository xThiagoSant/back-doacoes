
exports.up = function(knex) {
    return knex.schema.createTable('eventos', function(table) {
        table.increments();
        table.string('situacao', 1).notNullable();
        table.string('nome', 50).notNullable();
        table.string('descricao', 200).notNullable();
        table.date('dataEvento').notNullable();
        table.integer('IdOrganizador').notNullable();
        table.foreign('IdOrganizador').references('id').inTable('entidades');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('enventos');
};
