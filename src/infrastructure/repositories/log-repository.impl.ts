import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogDatasource } from '../../domain/datasources/log.datasorce';


export class LogRespositoryImple implements LogRepository {

    constructor(
        private readonly LogDatasource: LogDatasource
    ) { }

    saveLog(log: LogEntity): Promise<void> {
        return this.LogDatasource.saveLog(log)
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.LogDatasource.getLogs(severityLevel)
    }
}