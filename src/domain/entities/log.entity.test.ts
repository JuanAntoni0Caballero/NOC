import { LogEntity, LogSeverityLevel } from './log.entity';



describe('LogEntity', () => {

    const dataObj = {
        origin: 'LogEntity.test.ts',
        message: 'Hola mundo',
        level: LogSeverityLevel.high,
    }

    test('Should create a LogEntity instance', () => {

        const log = new LogEntity(dataObj);


        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message)
        expect(log.level).toBe(dataObj.level)
        expect(log.origin).toBe(dataObj.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    });

    test('Shold create a LogEntity instance from json', () => {

        const json = `{"message":"Service https://google.es working","level":"low","createdAt":"2024-10-17T09:40:02.279Z","origin":"check-service.ts"}`

        const log = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe("Service https://google.es working")
        expect(log.level).toBe(LogSeverityLevel.low)
        expect(log.origin).toBe("check-service.ts")
        expect(log.createdAt).toBeInstanceOf(Date)

    })


    test('Should create a LogEntity instance from object', () => {


        const log = LogEntity.fromObject(dataObj);


        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message)
        expect(log.level).toBe(dataObj.level)
        expect(log.origin).toBe(dataObj.origin)
        expect(log.createdAt).toBeInstanceOf(Date)
    })
})