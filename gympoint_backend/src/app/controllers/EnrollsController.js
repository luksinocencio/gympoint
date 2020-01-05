import { addMonths, parseISO } from 'date-fns'
import * as Yup from 'yup'

import Queue from '../../lib/Queue'
import EnrollMail from '../jobs/EnrollMail'
import Enrolls from '../models/Enrolls'
import Plan from '../models/Plan'
import Student from '../models/Student'

class EnrollsController {
  async index(req, res) {
    const { id, page } = req.query

    const include = [
      {
        model: Student,
        as: 'student',
        attributes: ['id', 'name'],
      },
      {
        model: Plan,
        as: 'plan',
        attributes: ['id', 'title', 'duration'],
      },
    ]

    if (id) {
      const enroll = await Enrolls.findByPk(id, { include })
      return res.json(enroll)
    }

    if (page) {
      const limit = 5

      const enrollsCount = await Enrolls.count()

      const lastPage = page * limit >= enrollsCount

      const queryLimitOffset = {
        limit,
        offset: (page - 1) * limit,
      }

      const enrolls = await Enrolls.findAll({
        include,
        ...queryLimitOffset,
      })

      return res.json({ lastPage, content: enrolls })
    }

    const enrolls = await Enrolls.findAll()

    return res.json(enrolls)
  }

  async store(req, res) {
    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        plan_id: Yup.number()
          .required()
          .integer()
          .positive(),
        student_id: Yup.number()
          .required()
          .positive(),
        start_date: Yup.date().required(),
      })

      return schema.isValid(requestBody)
    }

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' })
    }

    const { plan_id } = req.body
    const plan = await Plan.findOne({
      where: { id: plan_id },
    })

    if (!plan) {
      return res.status(400).json({ error: 'Plan not exists' })
    }

    const { student_id } = req.body

    const student = await Student.findByPk(student_id)

    if (!student) {
      return res.status(400).json({ error: 'Student not exists.' })
    }

    const userEnroll = await Enrolls.findOne({
      where: {
        student_id,
      },
    })

    if (userEnroll) {
      return res
        .status(400)
        .json({ error: 'Studen already enrolled into a plan' })
    }

    const { start_date } = req.body

    const end_date = addMonths(parseISO(start_date), plan.duration)

    const enrollment = await Enrolls.create({
      plan_id,
      student_id,
      start_date,
      end_date,
      price: plan.duration * plan.price,
    })

    await Queue.add(EnrollMail.key, {
      student,
      plan,
      start_date,
    })

    return res.json(enrollment)
  }

  async update(req, res) {
    const { id } = req.params

    const validateSchema = requestBody => {
      const schema = Yup.object().shape({
        plan_id: Yup.number().positive(),
        student_id: Yup.number().positive(),
        start_date: Yup.date(),
      })

      return schema.isValid(requestBody)
    }

    if (!(await validateSchema(req.body))) {
      return res.status(400).json({ error: 'Validação falhou' })
    }

    const enrollment = await Enrolls.findOne({
      where: { id },
    })

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exists' })
    }

    const { plan_id } = req.body
    const plan = await Plan.findByPk(plan_id)
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' })
    }

    const { student_id } = req.body
    const student = await Student.findByPk(student_id)
    if (!student) {
      return res.status(400).json({ error: 'Student does not exists' })
    }

    const { start_date } = req.body
    const end_date = addMonths(parseISO(start_date), plan.duration)

    await enrollment.update({
      plan_id,
      student_id,
      start_date,
      end_date,
      price: plan.duration * plan.price,
    })

    return res.json(enrollment)
  }

  async delete(req, res) {
    const { id } = req.params
    const enroll = await Enrolls.findByPk(id)

    if (!enroll) {
      return res.status(400).json({ error: 'Enroll not exists.' })
    }

    await enroll.destroy({})

    return res.json({ message: 'Deletado!' })
  }

  async show(req, res) {
    const { id } = req.params

    const include = [
      {
        model: Student,
        as: 'student',
        attributes: ['id', 'name'],
      },
      {
        model: Plan,
        as: 'plan',
        attributes: ['id', 'title', 'duration'],
      },
    ]

    const enroll = await Enrolls.findByPk({ id, include })

    if (!enroll) {
      return res.status(400).json({ error: 'Enroll not exists.' })
    }

    return res.json(enroll)
  }
}

export default new EnrollsController()
