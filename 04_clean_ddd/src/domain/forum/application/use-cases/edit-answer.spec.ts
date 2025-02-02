import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('Should be able to edit an answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('author01') },
      new UniqueEntityID('answer01'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author01',
      answerId: newAnswer.id.toValue(),
      content: 'Content already edited',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Content already edited',
    })
  })

  it('Should not be able to edit an answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('author01') },
      new UniqueEntityID('Answer01'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() => {
      return sut.execute({
        authorId: 'author02',
        answerId: newAnswer.id.toValue(),
        content: 'Content already edited',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
