import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRespositoryImple } from './log-repository.impl';

describe('log-repository.imple', () => {

    const mockLogDatasouce = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const logRepository = new LogRespositoryImple(mockLogDatasouce)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('Should saveLog call the datasource with arguments', async () => {


        const log = {
            level: 'low',
            origin: 'log-repository.imple.test.ts',
            message: 'Test message',
            createdAt: new Date()
        } as LogEntity

        await logRepository.saveLog(log)
        expect(mockLogDatasouce.saveLog).toHaveBeenCalledWith(log)


    })



    test('Should getLog call the datasource with arguments', async () => {

        const lowSeverity = LogSeverityLevel.low

        await logRepository.getLogs(lowSeverity)

        expect(mockLogDatasouce.getLogs).toHaveBeenCalledWith(lowSeverity)

    })
})