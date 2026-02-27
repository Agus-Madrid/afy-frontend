import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiService } from "src/app/shared/services/base-api.service";
import { StoredObject } from "../models/stored-object.model";

@Injectable({
    providedIn: 'root',
})
export class StorageService extends BaseApiService{
    private readonly storageUrl= 'storage';

    getPublicUrl(key: string): Observable<string> {
        const params = { key };
        const url = this.buildUrl(`${this.storageUrl}`);
        const buildParams = this.buildParams(params);
        return this.http.get<string>(url, { params: buildParams });
    }

    store(file: File): Observable<StoredObject> {
        const url = this.buildUrl(`${this.storageUrl}`);
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<StoredObject>(url, formData);
    }
}
