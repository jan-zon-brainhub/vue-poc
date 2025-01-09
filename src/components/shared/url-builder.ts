type QueryParams = Record<string, string | number | boolean | undefined>

class UrlBuilder {
  private readonly baseUrl: string
  private pathSegments: string[] = []
  private queryParams: QueryParams = {}

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  addPath(segment: string): this {
    this.pathSegments.push(segment)
    return this
  }

  addQueryParams(params: QueryParams): this {
    this.queryParams = { ...this.queryParams, ...params }
    return this
  }

  build(): string {
    const path = this.pathSegments.join('/')
    const queryString = Object.entries(this.queryParams)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&')

    return `${this.baseUrl}${path ? `/${path}` : ''}${queryString ? `?${queryString}` : ''}`
  }

  toString(): string {
    return this.build()
  }
}

export const buildUrl = (baseUrl: string) => new UrlBuilder(baseUrl)
