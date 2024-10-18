import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogDatasource } from './log.datasorce';


describe('log.datasource.ts', () => {

    const newLog = new LogEntity({
        message: 'Test message from mock',
        level: LogSeverityLevel.low,
        origin: 'log.datasource.test.ts'
    })

    class MockLogDatasource implements LogDatasource {

        async saveLog(log: LogEntity): Promise<void> {
            return
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }

    test('Shoud test the abstract class', async () => {

        const mockLogDatasource = new MockLogDatasource()

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource)
        expect(typeof mockLogDatasource.getLogs).toBe('function')
        expect(typeof mockLogDatasource.saveLog).toBe('function')

        await mockLogDatasource.saveLog(newLog)

        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high)

        expect(logs).toHaveLength(1)
        expect(logs[0]).toBeInstanceOf(LogEntity)

    })

})