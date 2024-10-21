import { CheckService } from "../domain/use-cases/checks/check-service"
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource"
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRespositoryImple } from "../infrastructure/repositories/log-repository.impl"
import { CronService } from "./cron/cron-service"
import { EmailService } from './email/email.service';




const fsLogRepository = new LogRespositoryImple(
    new FileSystemDatasource()
)


const mongoLogRepository = new LogRespositoryImple(
    new MongoLogDatasource()
)


const postgresLogRepository = new LogRespositoryImple(
    new PostgresDatasource()
)

// const LogRepository = new LogRespositoryImple(
//     // new FileSystemDatasource()
//     // new MongoLogDatasource()
//     new PostgresDatasource()
// )
const emailService = new EmailService();

export class Server {
    public static start() {
        console.log('Server started...')


        CronService.createJob(
            '*/5 * * * * *',
            () => {
                // const url = 'http://localhost:3000';
                const url = 'https://google.es';
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => { console.log(`${url} is ok`) },
                    (error) => { console.log(error) }
                ).execute(url)
                // new CheckService().execute('http://localhost:3000')
            }
        )

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         // const url = 'http://localhost:3000';
        //         const url = 'https://google.es';
        //         new CheckService(
        //             LogRepository,
        //             () => { console.log(`${url} is ok`) },
        //             (error) => { console.log(error) }
        //             // undefined,
        //             // undefined
        //         ).execute(url)
        //         // new CheckService().execute('http://localhost:3000')
        //     }
        // )

        // new SendEmailLogs(
        //     emailService, fileSystemLogRepository
        // ).execute([
        //     'prueba@msn.es', 'prueba2@msn.es'
        // ])

    }

}


