import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { ProjectResourceModel } from '../models/project-resource-model';
import { PostmanConfig } from 'src/app/shared/models/postman-config';
import { EndPoints } from 'src/app/shared/models/end-points';

@Injectable({
    providedIn: "root"
})
export class ResourceService {
    constructor(private http: HttpClient) { }

    getResourceByCode(projectCode: string) {
        return this.http
            .get(`${environment.DOMAIN}/${EndPoints.PRODOC_RESOURCES}/projectcode/${projectCode}`);
    }


    getResourceList() {
        return this.http.get(`${environment.DOMAIN}/${EndPoints.PRODOC_RESOURCES}`);
    }

    updateResource(resource: ProjectResourceModel): any {
        return this.http.put(
            `${environment.DOMAIN}/${EndPoints.PRODOC_RESOURCES}/${resource.id}`,
            resource
        );
    }

    saveResource(resource: ProjectResourceModel): any {
        return this.http.post(
            `${environment.DOMAIN}/${EndPoints.PRODOC_RESOURCES}`,
            resource
        );
    }

    deleteResource(resourceid: string) {
        return this.http.delete(`${environment.DOMAIN}/${EndPoints.PRODOC_RESOURCES}/id/${resourceid}`);
    }

}
