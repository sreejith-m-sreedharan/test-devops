db.createUser(
        {
            user: "sreejith",
            pwd: "sreejith",
            roles: [
                {
                    role: "readWrite",
                    db: "test"
                }
            ]
        }
);