// test unitarios para el login de usuario
const supertest = require('supertest')
const server = require('../server')
const cookieParser = require('cookie-parser');

server.app.use(cookieParser());
const request = supertest.agent(server.app)

// register requests
describe('POST /register', () => {

    it('Responde con estado 400 cuando no recibe datos', (done => {
        request
        .post('/users/register')
        .set('Accept', 'application/json')
        .expect({error:true,message:'Complete todos los campos.'})
        .expect(400)
        .end(err => {
            if (err) return done(err);
            done();
        });
    })),

    it('Responde con estado 422 cuando el nombre de usuario ya esta registrado', (done => {
        request
        .post('/users/register')
        .set('Accept', 'application/json')
        .send({username:'juan',password:'123'})
        .expect({error:true,message:'Este usuario ya existe.'})
        .expect(422)
        .end(err => {
            if (err) return done(err);
            done();
        });
    })),

    it('Responde con estado 201 cuando pasa todas las verificaciones y registra al usuario', (done => {
        request
        .post('/users/register')
        .set('Accept', 'application/json')
        .send({username:'test',password:'123'})
        .expect({error:false,message:'Usuario creado exitosamente.'})
        .expect(201)
        .end(err => {
            if (err) return done(err);
            done();
        });
    }))
});

// login requests
describe('POST /login', () => {

    it('Responde con estado 400 cuando no recibe datos', (done => {
        request
        .post('/users/login')
        .set('Accept', 'application/json')
        .expect('Bad Request')
        .expect(400)
        .end(err => {
            if (err) return done(err);
            done();
        });
    })),

    it('Responde con estado 401 cuando recibe datos incorrectos', (done => {
        request
        .post('/users/login')
        .set('Accept', 'application/json')
        .send({username:'test',password:'1234'})
        .expect('Unauthorized')
        .expect(401)
        .end(err => {
            if (err) return done(err);
            done();
        });
    })),

    it('Responde con estado 200 cuando recibe datos correctos', (done => {
        request
        .post('/users/login')
        .set('Accept', 'application/json')
        .send({username:'juan',password:'asd123'})
        .expect((res) => { res.body })
        .expect(200)
        .expect((res) => { 'access_token', res.headers['access_token'] })
        .end(err => {
            if (err) return done(err);
            done();
        });
    }))
});

// friends requests
describe('POST /friends', () => {

    it('Responde con estado 400 cuando no recibe datos', (done => {
        request
        .post('/users/friends')
        .set('Accept', 'application/json')
        .expect({error:true,message:'Este usuario no puede ser su amigo.'})
        .expect(400)
        .end(err => {
            if (err) return done(err);
            done();
        });
    })),

    it('Responde con estado 200 cuando agrega al usuario a tu lista de amigos', (done => {
        request
        .post('/users/friends')
        .set('Accept', 'application/json')
        .send({friend:'test'})
        .expect({error:false})
        .expect(200)
        .end(err => {
            if (err) return done(err);
            done();
        });
    })),

    it('Responde con estado 400 cuando el usuario ya esta en tu lista de amigos', (done => {
        request
        .post('/users/friends')
        .set('Accept', 'application/json')
        .send({friend:'test'})
        .expect({'error':true,message:'Este usuario ya esta en tu lista de amigos'})
        .expect(400)
        .end(err => {
            if (err) return done(err);
            done();
        });
    }))

});

// borrar amigos
describe('DELETE /friend', () => {

    it('Responde con estado 400 cuando no esta en tu lista de amigos', (done => {
        request
        .delete('/users/friend/anyuser')
        .set('Accept', 'application/json')
        .expect({'error':true,message:'Este usuario no es tu amigo'})
        .expect(400)
        .end(err => {
            if (err) return done(err);
            done();
        });
    })),

    it('Responde con estado 200 cuando borra al usuario de tu lista de amigos', (done => {
        request
        .delete('/users/friend/test')
        .set('Accept', 'application/json')
        .expect({error:false})
        .expect(200)
        .end(err => {
            if (err) return done(err);
            done();
        });
    }))

});

// datos del perfil
describe('POST /perfil', () => {

    it('Responde con estado 400 cuando no se envian todos los datos', (done => {
        request
        .post('/users/perfil')
        .set('Accept', 'application/json')
        .expect({error:true,message:'Complete todos los campos'})
        .expect(400)
        .end(err => {
            if (err) return done(err);
            done();
        });
    })),

    it('Responde con estado 200 cuando actualza los datos del perfil', (done => {
        request
        .post('/users/perfil')
        .set('Accept', 'application/json')
        .send({description: 'descripcion de pruebas'})
        .expect({error:false})
        .expect(200)
        .end(err => {
            if (err) return done(err);
            done();
        });
    }))

});

// obtener usuario
describe('GET /user', () => {

    it('Responde con estado 200 y los datos existentes del usuario', (done => {
        request
        .get('/users/user/test')
        .set('Accept', 'application/json')
        .expect((res) => { res.body })
        .expect(200)
        .end(err => {
            if (err) return done(err);
            done();
        });
    }))

});

