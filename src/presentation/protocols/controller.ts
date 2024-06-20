export interface Controller {
  handle: (request: any, response: any) => Promise<any>
}
