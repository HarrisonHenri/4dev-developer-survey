import LocalSaveAccessToken from './local-save-access-token'
import { SetStorageMock } from '@/data/test'
import faker from 'faker'
import { UnexpectedError } from '@/domain/errors'

type SutTypes={
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value', async () => {
    const { sut, setStorageMock } = makeSut()

    const accessToken = faker.random.uuid()

    await sut.save(accessToken)

    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

  test('should throw if SetStorage throw', async () => {
    const { sut, setStorageMock } = makeSut()

    const error = new Error()

    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(error)

    const promise = sut.save(faker.random.uuid())

    await expect(promise).rejects.toThrow(error)
  })

  test('should throw if accessToken is falsy', async () => {
    const { sut } = makeSut()

    const promise = sut.save(undefined)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
