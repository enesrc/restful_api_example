const db = require('./db-config')

module.exports = {
    findActor,
    addActor,
    findAnActor,
    updateActor,
    deleteActor
}

function findActor() {
    return db('actor');
}

function findAnActor(id) {
    return db('actor').where({ id }).first();
}

function addActor(actor){
    return db("actor").insert(actor, "id").then(([{id}]) => {
        return db("actor").where("id", id).first()
    })
}

function updateActor(updatedActor, id){
    return db("actor").update(updatedActor).where({ id })
    .then(updated => {
        if(updated === 1){
            return db("actor").where({ id }).first();
        }
    })
}

function deleteActor(id){
    return db("actor").del().where({ id });
}
