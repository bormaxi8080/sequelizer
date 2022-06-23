'use strict';

import { Sequelize, Op, Model, DataTypes } from 'sequelize';

import logger from "./Logger.js";

const config = {
    database: {
        user: 'USER_NAME',
        host: 'HOST_NAME',
        database: 'DATABASE_NAME',
        password: 'DATABASE_PASSWORD',
        port: 5432,
        statementTimeout: 60 * 1000,
        transactionTimeout: 60 * 1000
    }
};

class Sequelizer {
    constructor() {
        this.config = config;
        this.logger = logger;

        this.database = this.config.database.database;
        this.user = this.config.database.user;
        this.password = this.config.database.password;
        this.host = this.config.database.host;
        this.port = this.config.database.port;
        this.statementTimeout = this.config.statementTimeout;
        this.transactionTimeout = this.config.transactionTimeout;

        this.sequelize = this.getSequelize();
    }

    getSequelize() {
        return new Sequelize(this.database, this.user, this.password, {
            host: this.host,
            port: this.port,
            dialect: "postgres",
            logging: true,
            define: {},
            dialectOptions: {
                statement_timeout: this.statementTimeout,
                idle_in_transaction_session_timeout: this.transactionTimeout
            },
            pool: {
                max: 100,
                min: 0,
                acquire: 60000,
                idle: 80000,
            }
        });
    }

    defineModel(sequelize, modelName, model, attributes) {
        return sequelize.define(modelName, model, attributes);
    }

    models() {
        return this.sequelize.models;
    }
}

let sequelizer = new Sequelizer();

export {
    sequelizer,
    Sequelize,
    Op,
    Model,
    DataTypes
}

