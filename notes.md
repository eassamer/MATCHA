`/auth/login`
UserService: .findByEmail: UserDao: .findAuthUserByEmail: Unknown column 'users.userId' in 'where clause' (fixed)

`/relations/like`
adds the liked user in the matches, and when liked back, they add another matche (FIXED)
```json
"matches": [
        {
            "bio": "This is a test bio.",
            "sex": "Female",
            "userId": "21fbb916-6e07-40c9-bad3-29054bcd6d1a",
            "matchId": "5427356b-09c0-11f0-9a1e-0242ac120002",
            "lastName": "Last1",
            "latitude": 30.427799224853516,
            "birthdate": "1996-06-18 00:00:00.000000",
            "firstName": "First1",
            "interests": null,
            "longitude": -9.598099708557129,
            "userImages": null,
            "displayName": "User1"
        },
        {
            "bio": "This is a test bio.",
            "sex": "Female",
            "userId": "21fbb916-6e07-40c9-bad3-29054bcd6d1a",
            "matchId": "de8953f9-09bf-11f0-9a1e-0242ac120002",
            "lastName": "Last1",
            "latitude": 30.427799224853516,
            "birthdate": "1996-06-18 00:00:00.000000",
            "firstName": "First1",
            "interests": null,
            "longitude": -9.598099708557129,
            "userImages": null,
            "displayName": "User1"
        }
    ]
```
`getMatch()` should return the full profile of both users (FIXED)

(FIX) `getNearbyUsers()` it doesn't filter liked and matched users (FIXED)

(FIX) `addDislike()` check if the user already disliked user (FIXED)

(FIX) `getImages()`, create an array instead of a comma seperated string (FIXED)

(FIX) `deleteImage()`, fix response, and update index when one is delete e.g (0 is deleted, all idxs are decreased)



