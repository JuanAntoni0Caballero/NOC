import { CheckService } from "./check-service";
import { LogEntity } from "../../entities/log.entity";

describe('CheckService UseCase ', () => {


    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const successCallback = jest.fn()
    const errorCallback = jest.fn()


    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback)

    beforeEach(() => {
        jest.clearAllMocks()
    })


    test('Should call successCallback when fetch return true', async () => {


        const wasOk = await checkService.execute('https://google.es')

        expect(wasOk).toBe(true)
        expect(successCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )

    })


    test('Should call errorCallback when fetch return false', async () => {


        const wasOk = await checkService.execute('https://gooasdasdadadgle.es')

        expect(wasOk).toBe(false)
        expect(successCallback).not.toHaveBeenCalled()
        expect(errorCallback).toHaveBeenCalled()

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )

    })

})