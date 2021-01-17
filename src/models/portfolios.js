'use strict';
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Op = Sequelize.Op;


class Portfilios extends Model {

    static init(sequelize, DataTypes) {
        return super.init({
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                validate: {
                    notNull: {
                        msg: "O userId deve ser informado"
                    },
                    async isInUsers(value) {
                        try {
                            const user = await this.sequelize.models.User.get(value)
                            if (!user) {
                                throw new Error('Usuario associado não pode ser encontrado');
                            }
                        } catch (error) {
                            throw error;
                        }
                    }
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

    static async search(query, limit, offset) {
        let where = {}
        if (query.title) where.title = {
            [Op.like]: `%${query.title}%`
        }

        return await Protfolio.findAndCountAll({
            where: where,
            limit: limit < 100 && limit > 0 ? limit : 20,
            offset: offset
        })
    }
    static async get(id) {
        return await Portfolio.findByPk(id)
    }

}

module.exports = Portfilios;