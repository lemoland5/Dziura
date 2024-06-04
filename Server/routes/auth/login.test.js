const db_utilities = require("../../lib/db_utilities");
test('signup', async () =>
{
    //signup as a new user
    const req = {
        method: 'POST',
        body: JSON.stringify({
            username: 'testuser',
            email: 'test@test',
            password: 'password1234567890',
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let res = await fetch('http://5.tcp.eu.ngrok.io:18952'+'/api/signup', req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.message).toBe('User created');
    //if passes, delete user
    const {db, client} = await db_utilities.get_db();
    const users_collection = db.collection('users');
    const result = await users_collection.findOne({username: 'testuser'});
    await users_collection.deleteOne({_id: result._id});
    await client.close();
});

