interface ConfigDefinition {
    host: string
    port: number
    https: {
        enabled: boolean
        key?: string
        cert?: string
    }
    db: {
        host: string
        port: number
        database: string
    }
    debug: {
        stackSize: number
    }
    shutdown: {
        appKill: number
        serverClose: number
    }
    i18next: any
    rateLimiting: {
        windowMs: number
        max: number
        standardHeaders: boolean
        legacyHeaders: boolean
    }
}

declare module 'config' {
    const config: ConfigDefinition; // eslint-disable-line vars-on-top
    export default config;
}

declare namespace Express {
    export interface Request {
       user?: unknown
    }
 }
