import { Op } from 'sequelize'
import * as Yup from 'yup'

import Plan from '../models/Plan'
import User from '../models/User'

class PlanController {
  async index(req, res) {
    const { q, page } = req.query

    if (page) {
      const limit = 5

      const where = q ? { name: { [Op.iLike]: `%${q}%` } } : {}

      const plansCount = await Plan.count({ where })

      const lastPage = page * limit >= plansCount

      const plans = await Plan.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
      })

      return res.json({ lastPage, content: plans })
    }

    const plans = await Plan.findAll()

    return res.json(plans)
  }

  async store(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        price: Yup.number()
          .required()
          .positive(),
        duration: Yup.number()
          .required()
          .integer()
          .positive(),
      })

      return schema.isValid(requestBody)
    }

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' })
    }

    const loggedUser = await User.findByPk(req.userId)
    if (!loggedUser) {
      return res.status(400).json({ error: 'Token inválido' })
    }

    const { title, duration, price } = req.body
    const planAlreadyExists = await Plan.findOne({ where: { title } })
    if (planAlreadyExists) {
      return res.status(400).json({ error: 'O plano já existe' })
    }

    const plan = await Plan.create({ title, duration, price })
    return res.json(plan)
  }

  async update(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        price: Yup.number().positive(),
        duration: Yup.number()
          .integer()
          .positive(),
      })

      return schema.isValid(requestBody)
    }

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' })
    }

    const { id } = req.params
    const plan = await Plan.findByPk(id)

    if (!plan) {
      return res.status(400).json({ error: 'Plan not exists.' })
    }

    const { title } = req.body

    if (plan !== plan.title) {
      const userExists = await Plan.findOne({
        where: { title, id: { [Op.ne]: plan.id } },
      })

      if (userExists) {
        return res.status(400).json({ error: 'Plan already exists.' })
      }
    }

    const { duration, price } = await plan.update(req.body)

    return res.json({ id, title, duration, price })
    // return res.json({ ok: true });
  }

  async delete(req, res) {
    const { id } = req.params
    const plan = await Plan.findByPk(id)

    if (!plan) {
      return res.status(400).json({ error: 'Plan not exists.' })
    }

    await plan.destroy({})

    return res.json({ message: 'Deletado!' })
  }

  async show(req, res) {
    const { id } = req.params
    const plan = await Plan.findByPk(id)

    if (!plan) {
      return res.status(400).json({ error: 'Plan not exists.' })
    }

    return res.json(plan)
  }
}

export default new PlanController()
