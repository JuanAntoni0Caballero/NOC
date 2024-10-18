import { envs } from './envs.plugin'

describe('env.plugin.ts ', () => {

    test('Should return env options', () => {

        expect(envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: "prueba@msn.es",
            MAILER_SECRET_KEY: '123456',
            MAILER_SERVICE: "gmail",
            MONGO_DB_NAME: "NOC-TEST",
            MONGO_PASS: "123456789",
            MONGO_URL: "mongodb://root:123456789@localhost:27017/",
            MONGO_USER: "root",
            PROD: true,
        })
    })



    test('Should return error if not found env', async () => {

        jest.resetModules()
        process.env.PORT = 'ABC'

        try {
            await import('./envs.plugin')

            expect(true).toBeFalsy()

        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer')
        }
    })
})