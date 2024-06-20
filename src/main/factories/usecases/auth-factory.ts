import { AuthUseCase } from '@gateway/data/services/auth-usecase';
import { type Auth } from '@gateway/domain/usecases/auth';
import { JwtEncrypterAdapter } from '@gateway/infra/db/encrypter/jwt-encrypter-adapter';

export const makeAuthUseCase = (): Auth => {
  const encrypter = new JwtEncrypterAdapter();
  const authUseCase = new AuthUseCase(encrypter);

  return authUseCase;
};
