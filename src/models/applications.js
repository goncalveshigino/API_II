'use strict';
const Sequelize = require('sequelize')
const Model = Sequelize.Model
const Op = Sequelize.Op

class Application extends Model {
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
            jobId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O jobId deve ser informado.'
                    },
                    async isInJobs(value) {
                        try {
                            const job = await this.sequelize.models.Job.get(value)
                            if (!job) {
                                throw new Error('Job associado não pode ser encontrado');
                            }
                        } catch (error) {
                            throw error;
                        }
                    }
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'a descrição deve ser informado.'
                    },

                }
            },
            budget: {
                type: DataTypes.NUMERIC
            },
        }, {
            sequelize,
            underscored: true
        })
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'id',
            as: 'Freelancer'
        })

        this.belongsTo(models.Job, {
            foreignKey: 'jobId',
            targetKey: 'id',
            as: 'Job'
        })
    }

    static async search(query) {
        const limit = query.limit ? parseInt(query.limit) : 20
        const offset = query.offset ? parseInt(query.offset) : 0

        let where = {}
        if (query.jobId) where.jobId = query.jobId
        if (query.freelancerId) where.userId = query.freelancerId

        const { rows, count } = await Application.findAndCountAll({
            where: where,
            limit: limit,
            offset: offset,
            include: [{
                    model: this.sequelize.models.User,
                    as: 'Freelancer',
                    include: [{
                        model: this.sequelize.models.UserSkill,
                        as: 'UserSkills',
                        include: [{
                            model: this.sequelize.models.Skill,
                            as: 'Skill',
                        }]
                    }]
                },
                {
                    model: this.sequelize.models.Job,
                    as: 'Job',
                    include: [{
                            model: this.sequelize.models.User,
                            as: 'Hirer',
                        },
                        {
                            model: this.sequelize.models.Skill,
                            as: 'Skills'
                        }
                    ]
                }
            ]
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
        return await Application.findByPk(id, {
            include: [{
                    model: this.sequelize.models.User,
                    as: 'Freelancer',
                    include: [{
                        model: this.sequelize.models.UserSkill,
                        as: 'UserSkills',
                        include: [{
                            model: this.sequelize.models.Skill,
                            as: 'Skill',
                        }]
                    }]
                },
                {
                    model: this.sequelize.models.Job,
                    as: 'Job',
                    include: [{
                            model: this.sequelize.models.User,
                            as: 'Hirer',
                        },
                        {
                            model: this.sequelize.models.Skill,
                            as: 'Skills'
                        }
                    ]
                }
            ]
        })
    }

}

module.exports = Application