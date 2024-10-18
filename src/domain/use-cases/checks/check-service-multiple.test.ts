import { CheckServiceMultiple } from "./check-service-multiple";
import { LogEntity } from "../../entities/log.entity";

describe('CheckServiceMultiple UseCase ', () => {


    const mockRepositoryA = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepositoryB = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }
    const mockRepositoryC = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()


    const checkServiceMultiple = new CheckServiceMultiple(
        [mockRepositoryA, mockRepositoryB, mockRepositoryC],
        successCallback,
        errorCallback)

    beforeEach(() => {
        jest.clearAllMocks()
    })


    test('Should call successCallback when fetch return true', async () => {


        const wasOk = await checkServiceMultiple.execute('https://google.es')

        expect(wasOk).toBe(true)
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()

        expect(mockRepositoryA.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepositoryB.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepositoryC.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

    })


    test('Should call errorCallback when fetch return false', async () => {


        const wasOk = await checkServiceMultiple.execute('https://gooasdasdadadgle.es')

        expect(wasOk).toBe(false)
        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()

        expect(mockRepositoryA.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepositoryB.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
        expect(mockRepositoryC.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))

    })

})