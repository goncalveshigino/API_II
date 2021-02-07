'use strict';
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Op = Sequelize.Op;


class Portfolios extends Model {

    static init(sequelize, DataTypes) {
        return super.init({
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                validate: {
                    notNull: {
                        msg: "O userId deve ser informado"
                    },
                    /*  async isInUsers(value) {
                        try {
                            const user = await this.sequelize.models.User.get(value)
                            if (!user) {
                                throw new Error('Usuario associado não pode ser encontrado');
                            }
                        } catch (error) {
                            throw error;
                        }
                    }*/
                }
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "O title deve ser informado"
                    }
                }
            },
            description: DataTypes.STRING,
            pic: DataTypes.STRING,
        }, {
            sequelize,
            modelName: 'PortFolios',
        })
    }
    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'id',
            as: 'User'
        })
    }

    static async search(query) {

        const limit = query.limit ? parseInt(query.limit) : 20
        const offset = query.offset ? parseInt(query.offset) : 0

        let where = {}
        if (query.title) where.title = {
            [Op.like]: `%${query.title}%`
        }

        const { rows, count } = await Portfolios.findAndCountAll({
            where: where,
            limit: limit,
            offset: offset
        })
        return {
            entities: rows,
            meta: {
                count: count,
                limit: limit,
                offset: offset
            }
        }
    }
    static async getId(id) {
        return await Portfolios.findByPk(id)
    }

}

module.exports = Portfolios;