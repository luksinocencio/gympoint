import { subDays } from 'date-fns'
import { Op } from 'sequelize'

import Checkins from '../models/Checkins'
import Student from '../models/Student'

class CheckinsController {
  async store(req, res) {
    const { studentId } = req.params

    const student = await Student.findOne({
      where: { id: studentId },
    })

    if (!student) {
      return res.status(400).json({ error: 'Student not exisits' })
    }

    const checkins = await Checkins.findAll({
      where: {
        student_id: studentId,
        created_at: { [Op.between]: [subDays(new Date(), 7), new Date()] },
      },
    })

    if (checkins.length >= 5) {
      return res.status(400).json({ error: 'Check-ins number exceeded' })
    }

    const checkin = await Checkins.create({ student_id: studentId })

    return res.json(checkin)
  }

  async index(req, res) {
    const { studentId } = req.params
    const { page = 1 } = req.query

    const student = await Student.findByPk(studentId)

    if (!student) {
      return res.status(400).json({ error: 'This user is not a provider' })
    }

    const limit = 5

    const checkinsCount = await Checkins.count({
      where: { student_id: studentId },
    })

    const lastPage = page * limit >= checkinsCount

    const checkins = await Checkins.findAll({
      limit,
      offset: (page - 1) * limit,
      where: { student_id: studentId },
      order: [['created_at', 'desc']],
    })

    return res.json({ lastPage, content: checkins })
  }
}

export default new CheckinsController()
