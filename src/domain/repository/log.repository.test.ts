import { LogEntity, LogSeverityLevel } from '../entities/log.entity';
import { LogRepository } from './log.repository';


describe('log.repository.ts', () => {

    const newLog = new LogEntity({
        message: 'Test message from mock',
        level: LogSeverityLevel.low,
        origin: 'log.repository.test.ts'
    })

    class MockLogRepository implements LogRepository {

        async saveLog(log: LogEntity): Promise<void> {
            return
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog]
        }

    }

    test('Shoud test the abstract class', async () => {

        const mockLogRepository = new MockLogRepository()

        expect(mockLogRepository).toBeInstanceOf(MockLogRepository)
        expect(typeof mockLogRepository.getLogs).toBe('function')
        expect(typeof mockLogRepository.saveLog).toBe('function')

        await mockLogRepository.saveLog(newLog)

        const logs = await mockLogRepository.getLogs(LogSeverityLevel.high)

        expect(logs).toHaveLength(1)
        expect(logs[0]).toBeInstanceOf(LogEntity)

    })
})