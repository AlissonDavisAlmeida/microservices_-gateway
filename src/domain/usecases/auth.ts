import { type IAuthPayload } from '@alissondavisalmeida/jobber-shared';

export interface AuthUseCaseParams {
  token: string

}

export interface Auth {
  authenticate: (params: AuthUseCaseParams) => Promise<IAuthPayload>
}
