import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';


interface CheckServiceMultipleUseCase {
    execute(url: string): Promise<boolean>

}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {


    constructor(
        private readonly LogRepository: LogRepository[],
        private readonly successCallbacks: SuccessCallback,
        private readonly errorCallbacks: ErrorCallback
    ) { }

    private callLogs(log: LogEntity) {
        this.LogRepository.forEach(logRepository => {
            logRepository.saveLog(log)
        })
    }


    public async execute(url: string): Promise<boolean> {

        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP error! ${url}`)
            }

            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            })
            this.callLogs(log)
            this.successCallbacks && this.successCallbacks()
            return true
        } catch (error) {
            const errorMessage = `${url} is not ok ${error}`

            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            })
            this.callLogs(log)

            this.errorCallbacks && this.errorCallbacks(errorMessage)
            return false
        }
    }
}