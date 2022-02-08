// passport
const passport = require('passport')

// strategy local y jwt
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy

// bcrypt
const bcrypt = require('./helpers/bcrypt')

// conexion a la DB
const pool = require('./database/connection')


// get cookies
const getCookie = req => {
    let token = null
    if(req && req.cookies){
        token = req.cookies['access_token'];
    }
    return token
}

// Local strategy
passport.use(new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
}, async (username, password, done) => {
    // Obtengo el usuario de la base de datos, si existe verifico las contraseñas y lo retorno
    const row = await pool.query('SELECT * FROM users WHERE username = ?', username)

    if(row.length === 0) return done(null,false)
    else{
        const user = row[0]
        const userPassword = user.password
        const isValid = await bcrypt.MatchPassword(password,userPassword)
        if(isValid) return done(null,user)
        else return done(null,false)
    }
}));


// Jwt strategy
passport.use(new JwtStrategy({
    jwtFromRequest: getCookie,
    secretOrKey: 'test',
},(payload,done)=> {
    pool.query('SELECT * FROM users WHERE id = ?', [payload.sub],(error,user) => {
        if(error) return done(error,false)
        if(user) return done(null,user)
        return done(null,false)
    }) 
}))