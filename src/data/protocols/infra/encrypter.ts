import { type IAuthPayload } from '@alissondavisalmeida/jobber-shared';

export interface Encrypter {
  encrypt: (data: Record<string, any>) => Promise<string>
  decrypt: (value: string) => Promise<IAuthPayload>

}
