import { type IAuthPayload } from '@alissondavisalmeida/jobber-shared';
import { environmentVariables } from '@gateway/config/environment-variables';
import { type Encrypter } from '@gateway/data/protocols/infra/encrypter';
import jwt from 'jsonwebtoken';

export class JwtEncrypterAdapter implements Encrypter {
  decrypt = async (value: string) => {
    const payload: IAuthPayload = jwt.verify(value, environmentVariables.jwtToken) as IAuthPayload;
    return payload;
  };

  encrypt = async (data: Record<string, any>): Promise<string> => {
    const token = jwt.sign(data, `${environmentVariables.gatewayJwtToken}`);

    return token;
  };
}
