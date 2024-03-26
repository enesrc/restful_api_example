/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('actor_movie').del()
  await knex('actor_movie').insert([
    {movie_id: 1, actor_id: 1},
    {movie_id: 2, actor_id: 2},
    {movie_id: 3, actor_id: 3}
  ]);
};
