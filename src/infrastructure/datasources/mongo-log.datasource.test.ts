import { MongoDatabase } from '../../data/mongo/init';
import { envs } from '../../config/plugins/envs.plugin';
import mongoose from 'mongoose';
import { MongoLogDatasource } from './mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogModel } from '../../data/mongo';


describe('Mongo-log.datasource', () => {
    const logDatasource = new MongoLogDatasource()

    const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test-message',
        origin: 'Mongo-log.datasource.test'
    })

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL
        })
    })

    afterEach(async () => {
        await LogModel.deleteMany({})
    })

    afterAll(async () => {
        mongoose.connection.close();
    })

    test('Should create a log', async () => {

        const logSpy = jest.spyOn(console, 'log');

        await logDatasource.saveLog(log)

        expect(logSpy).toHaveBeenCalled()
        expect(logSpy).toHaveBeenCalledWith("Mongo Log created:", expect.any(String));

    })


    test('Should get log', async () => {

        await logDatasource.saveLog(log)


        const logs = await logDatasource.getLogs(LogSeverityLevel.low)

        expect(logs.length).toBe(1)
        expect(logs[0].level).toBe(LogSeverityLevel.low)

    })
})