import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    title: 'Example question',
    content: 'This is an example...',
    authorId: new UniqueEntityID('1'),
    ...override,
  })

  return question
}
