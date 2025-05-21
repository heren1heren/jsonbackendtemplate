import pool from './pool.js';
async function getAllPokemons() {
  const { rows } = await pool.query('SELECT * FROM Pokemons');

  return rows;
}
async function insertAPokemon(
  name,
  description,
  imgUrl,
  pokemonTypeId,
  trainerId
) {
  // pokemonTypeId should be determine automatically
  try {
    await pool.query(
      'INSERT INTO Pokemons(name,description,imgUrl,pokemonTypeId,trainerId) VALUES ($1, $2, $3,$4,$5)',
      [name, description, imgUrl, pokemonTypeId, trainerId]
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  } finally {
    return 'inserted';
  }
}
async function updateATrainerWithId(id, name, description, age, imgUrl) {
  try {
    await pool.query(
      `
      UPDATE Trainers
      SET name = $1,
          description = $2,
          age = $3,
          imgUrl = $4
      WHERE id = $5
       `,
      [name, description, age, imgUrl, id]
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  } finally {
    return 'updated';
  }
}
async function deleteAPokemonWithId(id) {
  try {
    await pool.query('Delete  From Pokemons Where id = $1', [id]);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  } finally {
    return 'delete success';
  }
}
module.exports = {
  getAllPokemons,
  getAPokemonWithId,
  insertAPokemon,
  updateAPokemonWithId,
  deleteAPokemonWithId,

  getAllTrainers,
  getATrainerWithId,
  insertATrainer,
  updateATrainerWithId,
  deleteATrainerWithId,

  getAllPokemonTypes,
  getAPokemonTypeWithId,
  insertAPokemonType,
  updateAPokemonTypeWithId,
};
