export interface HttpRequest<BodyRequest> {
  body?: BodyRequest

}

export interface HttpResponse<BodyResponse> {
  statusCode: number
  body: BodyResponse
}

export interface HttpAdapter<BodyRequest = any, BodyResponse = any> {
  post: (url: string, data: HttpRequest<BodyRequest>) => Promise<HttpResponse<BodyResponse>>
  get: (url: string) => Promise<HttpResponse<BodyResponse>>
  put: (url: string, data: HttpRequest<BodyRequest>) => Promise<HttpResponse<BodyResponse>>
  delete: (url: string) => Promise<HttpResponse<BodyResponse>>
}
