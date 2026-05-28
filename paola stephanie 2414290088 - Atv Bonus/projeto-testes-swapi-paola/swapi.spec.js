const request = require('supertest')

describe('Testes SWAPI', () => {

    test('Validar Luke Skywalker', async () => {

        const response = await request('https://swapi.info/api')
            .get('/people/1')

        expect(response.status).toBe(200)
        expect(response.body.name).toBe('Luke Skywalker')
        expect(response.body.gender).toBe('male')

    })

    test('Pessoa inexistente', async () => {

        const response = await request('https://swapi.info/api')
            .get('/people/9999')

        expect(response.status).toBe(404)

    })

    test('Buscar planeta Tatooine', async () => {

        const response = await request('https://swapi.info/api')
            .get('/planets/1')

        expect(response.status).toBe(200)
        expect(response.body.name).toBe('Tatooine')

    })

    test('Buscar filme', async () => {

        const response = await request('https://swapi.info/api')
            .get('/films/1')

        expect(response.status).toBe(200)

    })

    test('Buscar nave', async () => {

        const response = await request('https://swapi.info/api')
            .get('/starships/9')

        expect(response.status).toBe(200)

    })

    test('Buscar veículo', async () => {

        const response = await request('https://swapi.info/api')
            .get('/vehicles/4')

        expect(response.status).toBe(200)

    })

    test('Buscar espécie', async () => {

        const response = await request('https://swapi.info/api')
            .get('/species/1')

        expect(response.status).toBe(200)

    })

    test('Buscar personagem Darth Vader', async () => {

        const response = await request('https://swapi.info/api')
            .get('/people/4')

        expect(response.status).toBe(200)
        expect(response.body.name).toBe('Darth Vader')

    })

    test('Rota inexistente', async () => {

        const response = await request('https://swapi.info/api')
            .get('/heroes')

        expect(response.status).toBe(404)

    })

    test('Buscar todos os filmes', async () => {

        const response = await request('https://swapi.info/api')
            .get('/films')

        expect(response.status).toBe(200)

    })

})
