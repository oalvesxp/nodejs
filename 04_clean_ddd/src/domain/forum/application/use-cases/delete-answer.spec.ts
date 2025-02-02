import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('Should be able to delete a question', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('author01') },
      new UniqueEntityID('answer01'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author01',
      answerId: 'answer01',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('Should not be able to delete a question from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityID('author01') },
      new UniqueEntityID('answer01'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() => {
      return sut.execute({
        authorId: 'author02',
        answerId: 'answer01',
      })
    }).rejects.toBeInstanceOf(Error)

    expect(inMemoryAnswersRepository.items).toHaveLength(1)
  })
})
