import { format, parseISO } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Mail from '../../lib/Mail'

class EnrollMail {
  get key() {
    return 'EnrollMail'
  }

  async handle({ data }) {
    const { student, plan, start_date } = data

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matricula realizada',
      template: 'enrollment',
      context: {
        student: student.name,
        plan: plan.title,
        id: student.id,
        start_date: format(
          parseISO(start_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          },
        ),
      },
    })
  }
}

export default new EnrollMail()
