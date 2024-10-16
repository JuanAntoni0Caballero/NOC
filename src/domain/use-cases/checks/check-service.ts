

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>

}

type SuccessCallback = (() => void)
type ErrorCallback = ((error: string) => void)


export class CheckService implements CheckServiceUseCase {


    constructor(
        private readonly successCallbacks: SuccessCallback,
        private readonly errorCallbacks: ErrorCallback
    ) { }


    public async execute(url: string): Promise<boolean> {

        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP error! ${url}`)
            }
            this.successCallbacks()
            return true
        } catch (error) {
            console.log(`${error}`)

            this.errorCallbacks(`${error}`)
            return false
        }
    }
}