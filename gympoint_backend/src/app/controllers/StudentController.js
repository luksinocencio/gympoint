import { Op } from 'sequelize'
import * as Yup from 'yup'

import Enrolls from '../models/Enrolls'
import HelpOrder from '../models/HelpOrder'
import Student from '../models/Student'

class StudentController {
  async index(req, res) {
    const { id, q, page } = req.query

    if (id) {
      const student = await Student.findByPk(id)

      if (!student) {
        return res.status(400).json({ error: 'Aluno não encontrado' })
      }

      return res.json(student)
    }

    if (page) {
      const limit = 5

      const where = q ? { name: { [Op.iLike]: `%${q}%` } } : {}

      const studentsCount = await Student.count({ where })

      const lastPage = page * limit >= studentsCount

      const students = await Student.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
      })

      return res.json({ lastPage, content: students })
    }

    const students = await Student.findAll()

    return res.json(students)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number().required(),
      peso: Yup.number().required(),
      altura: Yup.number().required(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const userExists = await Student.findOne({
      where: { email: req.body.email },
    })

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' })
    }

    const { id, name, email, idade, peso, altura } = await Student.create(
      req.body,
    )

    return res.json({ id, name, email, idade, peso, altura })
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      idade: Yup.number(),
      peso: Yup.number(),
      altura: Yup.number(),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' })
    }

    const { email } = req.body

    const { id } = req.params
    const student = await Student.findByPk(id)

    if (!student) {
      return res.status(400).json({ error: 'Student not exists.' })
    }

    if (email !== student.email) {
      const userExists = await Student.findOne({ where: { email } })

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' })
      }
    }

    const { name, idade, peso, altura } = await student.update(req.body)

    return res.json({ id, name, email, idade, peso, altura })
  }

  async delete(req, res) {
    const { id } = req.params
    const student = await Student.findByPk(id)

    if (!student) {
      return res.status(400).json({ error: 'Student not exists.' })
    }

    const userEnroll = await Enrolls.findOne({
      where: {
        student_id: id,
      },
    })

    if (userEnroll) {
      await userEnroll.destroy({})
    }

    const userOrders = await HelpOrder.findOne({
      where: {
        student_id: id,
      },
    })

    if (userOrders) {
      await userOrders.destroy({})
    }

    await student.destroy({})

    return res.json({ message: 'deletadoooooooo' })
  }

  async show(req, res) {
    const { id } = req.body

    const student = await Student.findByPk(id)

    if (!student) {
      return res.status(400).json({ error: 'User not found' })
    }

    return res.json(student)
  }
}

export default new StudentController()
