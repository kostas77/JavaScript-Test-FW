"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
class DatabaseManager {
    constructor(log, dbConfig) {
        this.log = log.child({ child: 'DatabaseManager' });
        this.dbConfig = dbConfig;
        this.createConnectionPool();
    }
    createConnectionPool() {
        this.log.debug('Creating MySQL connection pool');
        const config = Object.assign({
            acquireTimeout: 30000,
            debug: false
        }, this.dbConfig);
        this.connectionPool = mysql_1.createPool(config);
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
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.connectionPool.getConnection((err, connection) => {
                    if (err) {
                        this.log.warn({ connectionPool: this.connectionPool.config, error: err }, 'Error getting connection');
                        return reject(err);
                    }
                    return resolve(connection);
                });
            });
        });
    }
    executeTransaction(executeQueries, completion) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield this.getConnection();
                yield this.query(connection, 'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE');
                connection.beginTransaction((err) => {
                    if (err) {
                        return releaseConnectionAndComplete(err);
                    }
                    executeQueries(connection, (err, ...args) => {
                        if (err) {
                            if (err === 'rollback') {
                                args.unshift(null);
                            }
                            else {
                                args.unshift(err);
                            }
                            connection.rollback(() => { releaseConnectionAndComplete(...args); });
                        }
                        else {
                            connection.commit((err) => {
                                args.unshift(err);
                                releaseConnectionAndComplete(...args);
                            });
                        }
                    });
                    function releaseConnectionAndComplete(...args) {
                        connection.release();
                        completion(...args);
                    }
                });
            }
            catch (err) {
                return completion(err);
            }
        });
    }
    query(connection, query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const log = this.log;
            return new Promise((resolve, reject) => {
                query = query.replace(/(\r\n|\n|\r)/gm, ' ');
                log.debug(`Executing query: ${query} with params ${params ? JSON.stringify(params) : 'null'}`);
                connection.query(query, params, function (err, result) {
                    if (err) {
                        log.warn({ error: err }, 'Query failed');
                        DatabaseManager.releaseConnection(connection);
                        return reject(err);
                    }
                    else {
                        log.debug('Query successful');
                        return resolve(result);
                    }
                });
            });
        });
    }
    runSimpleQuery(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.getConnection();
            const result = yield this.query(connection, query, params);
            DatabaseManager.releaseConnection(connection);
            return result;
        });
    }
    static releaseConnection(connection) {
        try {
            connection.release();
        }
        catch (err) {
        }
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.connectionPool.end(err => {
                    if (err) {
                        this.log.warn({ err }, 'Error closing connection');
                        reject(err);
                    }
                    else {
                        this.log.debug('Database connection closed');
                        return resolve();
                    }
                });
            });
        });
    }
}
exports.DatabaseManager = DatabaseManager;
//# sourceMappingURL=DatabaseManager.js.map