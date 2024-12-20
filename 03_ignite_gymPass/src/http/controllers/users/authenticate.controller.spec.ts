import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('[e2e] Authenticate Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Shoud be able to authenticated', async () => {
    await request(app.server).post('/users').send({
      name: 'Jhon Doe',
      email: 'jhon.doe@example.com',
      password: '123456',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'jhon.doe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
