'use strict';
const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const Op = Sequelize.Op;

class JobSkill extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            jobId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                validate: {
                    notNull: {
                        msg: "O jobId deve ser informado"
                    },
                    async isInJobs(value) {
                        try {
                            const job = await this.sequelize.models.Job.get(value)
                            if (!job) {
                                throw new Error('Job associado nao pode ser encontrado')
                            }

                        } catch (error) {
                            throw error;
                        }
                    }
                }

            },
            skillId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                validate: {
                    notNull: {
                        msg: "O skillId deve ser informado"
                    },
                    async isInJobs(value) {
                        try {
                            const job = await this.sequelize.models.Job.get(value)
                            if (!job) {
                                throw new Error('Skill associado nao pode ser encontrado')
                            }

                        } catch (error) {
                            throw error;
                        }
                    }
                }

            }
        }, {
            tableName: 'JobsSkills',
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Job, {
            foreignKey: 'jobId',
            targetKey: 'id',
            as: 'User'
        })

        this.belongsTo(models.Skill, {
            foreignKey: 'skillId',
            targetKey: 'id',
            as: 'Skill'
        })

    }
}

module.exports = JobSkill