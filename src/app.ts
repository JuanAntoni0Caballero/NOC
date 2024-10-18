import { PrismaClient } from "@prisma/client"
import { envs } from "./config/plugins/envs.plugin"
import { LogModel, MongoDatabase } from "./data/mongo"
import { Server } from "./presentation/server"


(() => {
    main()
})()


async function main() {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })


    // const newLog = await prisma.logModel.create({
    //     data: {
    //         message: 'Test message from prisma',
    //         level: 'HIGH',
    //         origin: 'app.ts'
    //     }
    // })

    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'MEDIUM'
    //     }
    // })

    // console.log(logs)

    // const newLog = await LogModel.create({
    //     message: 'Test message from mongo',
    //     level: 'low',
    //     origin: 'app.ts'
    // })

    // await newLog.save()

    // const logs = await LogModel.find()
    // console.log(logs)

    Server.start()
}