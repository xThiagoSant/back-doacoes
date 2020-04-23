
exports.up = function(knex) {
    return knex.schema.createTable('doacoes', function(table){
        table.increments();
        table.string('situacao', 1).notNullable();
        table.string('doarAlimento', 1).notNullable();
        table.string('doarDinheiro', 1).notNullable();
        table.string('doarMaoDeObra', 1).notNullable();
        table.date('dataDaEntrega').notNullable();
        table.string('descricao', 200).notNullable();
        table.integer('idEvento').notNullable();
        table.foreign('idEvento').references('id').inTable('eventos');
        table.integer('idDoador').notNullable();
        table.foreign('idDoador').references('id').inTable('entidades');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('doacoes');
};
