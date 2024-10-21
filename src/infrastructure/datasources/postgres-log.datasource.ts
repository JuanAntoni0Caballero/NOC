import { LogDatasource } from "../../domain/datasources/log.datasorce";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLeve } from '@prisma/client';


const prismaClient = new PrismaClient()

const severityEmun = {
    low: SeverityLeve.LOW,
    medium: SeverityLeve.MEDIUM,
    high: SeverityLeve.HIGH
}

export class PostgresDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEmun[log.level]
        const newLog = await prismaClient.logModel.create({
            data: {
                ...log,
                level: level
            }
        })

        console.log('Postgres log created:', newLog.id)
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const level = severityEmun[severityLevel]
        const logs = await prismaClient.logModel.findMany({
            where: {
                level: level
            }
        })

        return logs.map(LogEntity.fromObject)
    }

}