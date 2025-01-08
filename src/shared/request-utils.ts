export class HttpError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export class BadRequestError extends HttpError {
  status = 400
}
export class UnauthorizedError extends HttpError {
  status = 401
}
export class ForbiddenError extends HttpError {
  status = 403
}

export const assertResponseOk = (response: Response) => {
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new BadRequestError(response.status, response.statusText)
      case 401:
        throw new UnauthorizedError(response.status, response.statusText)
      case 403:
        throw new ForbiddenError(response.status, response.statusText)
      default:
        throw new HttpError(response.status, response.statusText)
    }
  }
  return response
}
