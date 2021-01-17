'use strict';
const Sequelize = require('sequelize')
const Model = Sequelize.Model
const Op = Sequelize.Op

class UserSkill extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O userId deve ser informado.'
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
                },
            },
            skillId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O skillId deve ser informado.'
                    },
                    async isInSkills(value) {
                        try {
                            const skill = await this.sequelize.models.Skill.get(value)
                            if (!skill) {
                                throw new Error('Skill associado não pode ser encontrado');
                            }
                        } catch (error) {
                            throw error;
                        }
                    }
                },
            },
            level: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
                validate: {
                    notNull: {
                        msg: 'O nível deve ser informado.'
                    },
                    isIn: {
                        args: [
                            [
                                1, //Básico
                                2, //Intermediário
                                3 //Avançado
                            ]
                        ],
                        msg: 'São aceitos apenas perfis 1 - Básico, 2 - Intermediário e 3 - Avançado.'
                    }
                }
            }
        }, {
            tableName: 'UserSkills',
            sequelize,

        })
    }

    static associate(models) {
        this.belongsTo(models.User, {
                foreignKey: 'userId',
                targetKey: 'id',
                as: 'User'
            }),

            this.belongsTo(models.Skill, {
                foreignKey: 'skillId',
                targetKey: 'id',
                as: 'Skill'
            })
    }

    static async search(query) {

    }

    static async get(id) {
        return await UserSkill.findByPk(id)
    }

    toJSON() {
        const values = Object.assign({}, this.get())
        const levels = [
            '',
            'Iniciante',
            'Intermediário',
            'Avaçnado'
        ]
        console.log(values)
        return {
            id: values.id,
            skillId: values.Skill ? values.Skill.dataValues.id : '',
            name: values.Skill ? values.Skill.dataValues.name : '',
            lavel: values.level,
            levelName: levels[values.level]
        }
    }
}

module.exports = UserSkill