import { inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { API_BASE_URL } from '../config/api-base-url.token';

type Primitive = string | number | boolean;
type ParamValue = Primitive | Primitive[] | null | undefined;

export abstract class BaseApiService {
  protected readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  protected buildUrl(path = ''): string {
    const sanitizedBase = this.apiBaseUrl.replace(/\/+$/, '');
    const sanitizedPath = path.replace(/^\/+/, '');
    return sanitizedPath ? `${sanitizedBase}/${sanitizedPath}` : sanitizedBase;
  }

  protected buildParams(params?: Record<string, ParamValue>): HttpParams {
    let httpParams = new HttpParams();

    if (!params) {
      return httpParams;
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((entry) => {
          httpParams = httpParams.append(key, String(entry));
        });
        return;
      }

      httpParams = httpParams.set(key, String(value));
      console.log(`Set param: ${key} = ${value}`);
    });

    return httpParams;
  }
}
