import * as Yup from 'yup'

import HelpOrder from '../models/HelpOrder'
import Student from '../models/Student'
import Notification from '../schemas/Notification'

class HelpOrderController {
  async index(req, res) {
    const { page } = req.query

    const include = [
      {
        model: Student,
        as: 'student',
        attributes: ['id', 'name'],
      },
    ]

    if (page) {
      const limit = 5

      const helpCount = await HelpOrder.count()

      const lastPage = page * limit >= helpCount

      const queryLimitOffset = {
        limit,
        offset: (page - 1) * limit,
      }

      const help = await HelpOrder.findAll({
        include,
        ...queryLimitOffset,
        order: [['created_at', 'asc']],
      })

      return res.json({ lastPage, content: help })
    }

    const help = await HelpOrder.findAll({
      include,
      order: [['created_at', 'asc']],
    })

    return res.json(help)
  }

  async show(req, res) {
    const { id } = req.params
    const { page = 1 } = req.query

    const student = await Student.findByPk(id)

    if (!student) {
      return res.status(400).json({ error: 'Student not exists.' })
    }

    const limit = 5

    const include = [
      {
        model: Student,
        as: 'student',
        attributes: ['id', 'name'],
      },
    ]

    const checkinsCount = await HelpOrder.count({
      where: { student_id: student.id },
    })

    const lastPage = page * limit >= checkinsCount

    const orders = await HelpOrder.findAll({
      where: { student_id: id },
      order: [['created_at', 'asc']],
      limit,
      offset: (page - 1) * limit,
      include,
    })

    return res.json({ lastPage, content: orders })
  }

  async store(req, res) {
    const { id } = req.params

    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        question: Yup.string().required(),
      })

      return schema.isValid(requestBody)
    }

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' })
    }

    const student = await Student.findByPk(id)

    if (!student) {
      return res.status(400).json({ error: 'Student not exists.' })
    }

    const { question } = req.body

    const orders = await HelpOrder.create({ student_id: id, question })

    // Notify Admin orderHelp

    await Notification.create({
      content: `Novo pedido de ajuda de ${student.name}`,
      user: id,
    })

    return res.json(orders)
  }

  async update(req, res) {
    const { id } = req.params
    const { answear } = req.body

    const order = await HelpOrder.findByPk(id)

    if (!order) {
      return res.status(400).json({ error: 'Order not exists.' })
    }

    const answear_at = new Date()

    const resp = await order.update({
      answear,
      answear_at,
    })

    return res.json(resp)
  }
}

export default new HelpOrderController()
