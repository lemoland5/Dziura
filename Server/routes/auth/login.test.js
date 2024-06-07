const db_utilities = require("../../lib/db_utilities");
<<<<<<< Updated upstream
describe("signup+login", () => {
  describe("signup", () => {
    test('signup', async () => {
      //signup as a new user
      const req = {
=======
const serverAddress = 'http://localhost:3000';
test('signup', async () =>
{
    //signup as a new user
    const req = {
>>>>>>> Stashed changes
        method: 'POST',
        body: JSON.stringify({
          username: 'testuser',
          email: 'test@test',
          password: 'password1234567890',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
<<<<<<< Updated upstream
      };
      let res = await fetch('http://localhost:3000' + '/api/signup', req);
      const json = await res.json();
      expect(res.status).toBe(200);
      expect(json.message).toBe('User created');
    });
  });
  describe("login", () => {
    test('login', async () => {
      //signup as a new user
      const req = {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test',
          password: 'password1234567890',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      let res = await fetch('http://localhost:3000' + '/api/login', req);
      const json = await res.json();
      expect(res.status).toBe(200);
      expect(json.message).toBe('login successful');
    });
  });
  afterAll(async () => {
    const { db, client } = await db_utilities.get_db();
    const users_collection = db.collection('users');
    await users_collection.deleteOne({ username: 'testuser' });
    await client.close();
  })
})
=======
        mode: 'cors',
    };
    let res = await fetch(serverAddress+'/api/signup', req);
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.message).toBe('User created');
    // //login as new user
    test('login', async () =>
    {
        const req = {
            method: 'POST',
            body: JSON.stringify({
                email: 'test@test',
                password: 'password1234567890',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
        };
        let res = await fetch(serverAddress+'/api/login', req);
        const json = await res.json();
        expect(res.status).toBe(200);
        expect(json.message).toBe('login successful');
        //get user
        test('get user', async () =>
        {
            const req = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
            };
            let res = await fetch(serverAddress+'/api/user/@me', req);
            const json = await res.json();
            expect(res.status).toBe(200);
            expect(json.username).toBe('testuser');
        });
    }
    );

    // delete


    // //if passes, delete user
    // const {db, client} = await db_utilities.get_db();
    // const users_collection = db.collection('users');
    // const result = await users_collection.findOne({username: 'testuser'});
    // await users_collection.deleteOne({_id: result._id});
    // await client.close();
});

>>>>>>> Stashed changes
