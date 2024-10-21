import path from 'path';
import { FileSystemDatasource } from './file-system.datasource';
import fs from 'fs';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('file-system.datasource.test', () => {

    const logPath = path.join(__dirname, '../../../logs')

    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true })
    })

    test('Should create a log files if they not exists', () => {
        new FileSystemDatasource();

        const files = fs.readdirSync(logPath);
        expect(files).toEqual(['logs-all.log', 'logs-high.log', 'logs-medium.log'])
    })

    test('Shoild not throw a error if path exists', () => {

        new FileSystemDatasource()
        new FileSystemDatasource()

        expect(true).toBeTruthy()
    })


    test('Should save a log in logs-all.log', () => {

        const logDataSource = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'Test log',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        })

        logDataSource.saveLog(log)

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')

        expect(allLogs).toContain(JSON.stringify(log))
    })

    test('Should save a log in logs-all.log and logs-medium.log', () => {

        const logDataSource = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'Test log',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        })

        logDataSource.saveLog(log)

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8')

        expect(allLogs).toContain(JSON.stringify(log))
        expect(mediumLogs).toContain(JSON.stringify(log))
    })


    test('Should save a log in logs-all.log and logs-high.log', () => {

        const logDataSource = new FileSystemDatasource();

        const log = new LogEntity({
            message: 'Test log',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        })

        logDataSource.saveLog(log)

        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8')
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8')

        expect(allLogs).toContain(JSON.stringify(log))
        expect(highLogs).toContain(JSON.stringify(log))
    })

    test('Should return all logs', async () => {

        const logDataSource = new FileSystemDatasource();

        const logLow = new LogEntity({
            message: 'Test log low',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        })

        const logMedium = new LogEntity({
            message: 'Test log medium',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        })

        const logHigh = new LogEntity({
            message: 'Test log high',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        })

        await logDataSource.saveLog(logLow)
        await logDataSource.saveLog(logMedium)
        await logDataSource.saveLog(logHigh)


        const logsLow = await logDataSource.getLogs(LogSeverityLevel.low)
        const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium)
        const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high)

        expect(logsLow).toEqual(expect.arrayContaining([logLow]))
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]))
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]))
    })


    test('Should throw a error if seberity level is not define', async () => {

        const logDataSource = new FileSystemDatasource()
        const custumSeberityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel
        try {
            await logDataSource.getLogs(custumSeberityLevel)
            expect(true).toBeFalsy()
        } catch (error) {
            const errorString = `${error}`

            expect(errorString).toContain(`Error: ${custumSeberityLevel} not implemented`)
        }
    })
})