/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movie').del()
  await knex('movie').insert([
    {id: 1, name: 'Tosun Pasa'},
    {id: 2, name: 'Banker Bilo'},
    {id: 3, name: 'Neseli Gunler'}
  ]);
};
