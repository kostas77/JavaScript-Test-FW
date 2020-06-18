import { Pool, PoolConnection, createPool } from 'mysql';
import *  as Logger from 'bunyan';

export interface IDBConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}

export interface ICompletionCallback {
    (err: any, ...args: any[]): void;
}

export interface IExecuteQueriesCallback {
    (connection: PoolConnection, callback: ICompletionCallback): Promise<void>;
}

export class DatabaseManager {
    private log: Logger;
    private dbConfig: IDBConfig;
    private connectionPool: Pool;

    constructor(log: Logger, dbConfig: IDBConfig) {
        this.log = log.child({ child: 'DatabaseManager' });
        this.dbConfig = dbConfig;
        this.createConnectionPool();
    }

    private createConnectionPool(): void {
        this.log.debug('Creating MySQL connection pool');
        const config: any = Object.assign({
            acquireTimeout: 30000,
            debug: false
        }, this.dbConfig);
        this.connectionPool = createPool(config);
        this.log.debug({ config }, 'Created MySQL connection pool');

        this.connectionPool.on('acquire', (connection) => {
            this.log.debug({ threadId: connection.threadId }, 'Connection acquired');
        });

        this.connectionPool.on('connection', (connection) => {
            this.log.debug({ threadId: connection.threadId }, 'Connection made');
        });

        this.connectionPool.on('release', (connection) => {
            this.log.debug({ threadId: connection.threadId }, 'Connection released');
        });
    }

    public async getConnection(): Promise<PoolConnection> {
        return new Promise<PoolConnection>((resolve, reject) => {
            this.connectionPool.getConnection((err: Error, connection: PoolConnection): void => {
                if (err) {
                    this.log.warn({ connectionPool: this.connectionPool.config, error: err }, 'Error getting connection');
                    return reject(err);
                }
                return resolve(connection);
            });
        });
    }

    public async executeTransaction(executeQueries: IExecuteQueriesCallback, completion: Function): Promise<void> {
        try {
            const connection: PoolConnection = await this.getConnection();
            // Set transaction and prevent dirty-reads while we're updating
            await this.query(connection, 'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE');

            connection.beginTransaction((err) => {
                if (err) {
                    return releaseConnectionAndComplete(err);
                }
                // Execute the transaction and provide a callback to tidy up
                executeQueries(connection, (err: any, ...args: any[]) => {
                    // Commit or rollback transaction, then proxy callback
                    if (err) {
                        if (err === 'rollback') {
                            args.unshift(null);
                        } else {
                            args.unshift(err);
                        }
                        connection.rollback(() => { releaseConnectionAndComplete(...args); });
                    } else {
                        connection.commit((err) => {
                            args.unshift(err);
                            releaseConnectionAndComplete(...args);
                        });
                    }
                });

                function releaseConnectionAndComplete(...args: any[]): void {
                    connection.release();
                    completion(...args);
                }
            });
        } catch (err) {
            return completion(err);
        }
    }

    public async query(connection: PoolConnection, query: string, params?: any): Promise<any> {
        const log = this.log;
        return new Promise((resolve, reject) => {
            query = query.replace(/(\r\n|\n|\r)/gm, ' ');
            log.debug(`Executing query: ${query} with params ${params ? JSON.stringify(params) : 'null'}`);
            connection.query(query, params, function (err: Error, result: any): void {
                if (err) {
                    log.warn({ error: err }, 'Query failed');
                    DatabaseManager.releaseConnection(connection);
                    return reject(err);
                } else {
                    log.debug('Query successful');
                    return resolve(result);
                }
            });
        });
    }

    public async runSimpleQuery(query: string, params?: any): Promise<any> {
        const connection: PoolConnection = await this.getConnection();
        const result: any = await this.query(connection, query, params);
        DatabaseManager.releaseConnection(connection);
        return result;
    }

    public static releaseConnection(connection: PoolConnection): void {
        try {
            connection.release();
        } catch (err) {
            // We don't mind if its not needed
        }
    }

    public async close(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.connectionPool.end(err => {
                if (err) {
                    this.log.warn({ err }, 'Error closing connection');
                    reject(err);
                } else {
                    this.log.debug('Database connection closed');
                    return resolve();
                }
            });
        });
    }

}
