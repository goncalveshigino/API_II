'use strict';
const Sequelize = require('sequelize')
const Model = Sequelize.Model
const Op = Sequelize.Op

class Skill extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O nome deve ser informado.'
                    }
                }
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: true
        })
    }

    static associate(models) {

    }

    static async search(query) {
        const limit = query.limit ? parseInt(query.limit) : 500
        const offset = query.offset ? parseInt(query.offset) : 0

        let where = {}
        if (query.name) where.name = {
            [Op.like]: `%${query.name}%`
        }

        const { rows, count } = await Skill.findAndCountAll({
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

    static async get(id) {
        return await Skill.findByPk(id)
    }
}

module.exports = Skill