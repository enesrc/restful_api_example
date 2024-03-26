/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('actor', (table) => {
        table.increments(); //id
        table.string('name').notNullable();
    }).createTable('movie', (table) =>{
        table.increments();
        table.string('name').notNullable();
    }).createTable('actor_movie', (table) => {
        table.increments();
        table.integer('movie_id').unsigned();
        table.integer('actor_id').unsigned();
        table.foreign('movie_id').references('movie.id').onUpdate('CASCADE').onDelete('CASCADE');
        table.foreign('actor_id').references('actor.id').onUpdate('CASCADE').onDelete('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('actor_movie').dropTableIfExists('movie').dropTableIfExists('actor');
};
