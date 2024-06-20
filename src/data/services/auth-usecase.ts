import { type AuthUseCaseParams, type Auth } from '@gateway/domain/usecases/auth';
import { type Encrypter } from '../protocols/infra/encrypter';
import { UnauthorizedError, type IAuthPayload } from '@alissondavisalmeida/jobber-shared';

export class AuthUseCase implements Auth {
  constructor (
    private readonly encrypter: Encrypter
  ) {}

  authenticate = async (params: AuthUseCaseParams): Promise<IAuthPayload> => {
    const result = await this.encrypter.decrypt(params.token);

    if (!result) throw new UnauthorizedError('Invalid token', 'UnauthorizedError');

    return result;
  };
}
