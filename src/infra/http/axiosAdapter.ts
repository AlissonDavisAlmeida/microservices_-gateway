import { type Encrypter } from '@gateway/data/protocols/infra/encrypter';
import { type HttpAdapter, type HttpRequest, type HttpResponse } from '@gateway/data/protocols/infra/http-request';
import axios, { type AxiosInstance } from 'axios';

export class AxiosAdapter<BodyRequest = any, BodyResponse = any> implements HttpAdapter<BodyRequest, BodyResponse> {
  private axiosInstance: AxiosInstance = null as any;
  constructor (
    private readonly baseUrl: string,
    private readonly serviceName: string | null,
    private readonly encrypter: Encrypter
  ) {
    this.setupAxiosInstance().then(axiosInstance => {
      this.axiosInstance = axiosInstance;
    }).catch(err => {
      throw err;
    });
  }

  setupAxiosInstance = async (): Promise<AxiosInstance> => {
    let gatewayToken = '';

    if (this.serviceName) {
      gatewayToken = await this.encrypter.encrypt({ id: this.serviceName });
    }

    const axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        gatewayToken
      },
      withCredentials: true
    });

    return axiosInstance;
  };

  post = async (url: string, data: HttpRequest<BodyRequest>): Promise<HttpResponse<BodyResponse>> => {
    const httpResponse = await this.axiosInstance.post(url, data);

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    };
  };

  get = async (url: string): Promise<HttpResponse<BodyResponse>> => {
    const httpResponse = await this.axiosInstance.get(url);

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    };
  };

  put = async (url: string, data: HttpRequest<BodyRequest>): Promise<HttpResponse<BodyResponse>> => {
    const httpResponse = await this.axiosInstance.put(url, data);

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    };
  };

  delete = async (url: string): Promise<HttpResponse<BodyResponse>> => {
    const httpResponse = await this.axiosInstance.delete(url);

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    };
  };
}
