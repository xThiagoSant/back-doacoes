exports.up = function(knex) {
    return knex.schema.createTable('entidades', function(table){
        table.increments();
        table.string('situacao', 1).notNullable();
        table.string('login', 20).notNullable();
        table.string('senha', 8).notNullable();
        table.string('organizador', 1);
        table.string('doador', 1);
        table.string('nome', 50).notNullable();
        table.string('endereco', 200).notNullable();
        table.date('dataCadastro').notNullable();
        table.string('cpf', 11);
        table.string('cnpj', 14);
        table.string('email', 50).notNullable();
        table.string('whatsapp', 20).notNullable();
        table.string('telefone', 20).notNullable();
        table.string('dadosConta', 200);
    })  
};

exports.down = function(knex) {
    return knex.schema.dropTable('entidades');
};
