const { authenticate } = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');


function initialize(passport, getUserByName){
     const authenticateUser  = async (username, password, done) => {
           const user = await getUserByName(username);
           if (user == null) {
            console.log('no user found')
            return done(null, false, {message: 'Invalid Credentials'});
           }

           try {
                if (await bcrypt.compare(password, user.hashedpassword)){
                    return done(null, user, {message: 'Log in successful'});
                } else {
                    return done(null, false, {message: 'Invalid Credentials'})
                }
           } catch (e) {
                return done(e);
           }
    }
    passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'}, authenticateUser));

    passport.serializeUser((user, done) => {
        console.log('in serialize User');
        process.nextTick(() => {
            console.log(user.id + ' id in serialize ' + user.username + ' username in serialize')
            return done( null, {
                id: user.id,
                username: user.username,

            })
        })
    })

    passport.deserializeUser((userData, done) => {
    
            console.log('in deserialize ' + userData);
            const user = {id : userData.id, username: userData.username};
            done(null, user)
        
    }) 
}

module.exports = initialize;