const mongodb = require('mongodb')

const get_user_data = async (sessionId, db) => {
    const session = await db
    .collection("sessions")
    .findOne({ _id: new mongodb.ObjectId(sessionId.toString()) });
    const user = await db
    .collection("users")
    .findOne({ _id: new mongodb.ObjectId(session.user) });

    return {session : session, user : user}
} 

module.exports = {
    get_user_data
}