import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { ProjectBudgetModel } from '../models/project-budget-model';
import { PostmanConfig } from 'src/app/shared/models/postman-config';
import { EndPoints } from 'src/app/shared/models/end-points';

@Injectable({
    providedIn: 'root'
})
export class BudgetService {
    nocache_headers = {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "Sat, 01 Jan 2000 00:00:00 GMT"
    };

    constructor(private http: HttpClient) { }

    getBudgetByCode(projectCode: string) {
        return this.http
            .get(`${environment.DOMAIN}/${EndPoints.PRODOC_BUDGETS}/projectcode/${projectCode}`, {
                headers: this.nocache_headers
            });
    }


    getBudgetList() {
        return this.http.get(`${environment.DOMAIN}/${EndPoints.PRODOC_BUDGETS}`);
    }

    updateBudget(budget: ProjectBudgetModel): any {
        return this.http.put(
            `${environment.DOMAIN}/${EndPoints.PRODOC_BUDGETS}/${budget.id}`,
            budget
        );
    }

    saveBudget(budget: ProjectBudgetModel): any {
        return this.http.post(
            `${environment.DOMAIN}/${EndPoints.PRODOC_BUDGETS}`,
            budget
        );
    }

    deleteBudget(budgetid: string) {
        return this.http.delete(`${environment.DOMAIN}/${EndPoints.PRODOC_BUDGETS}/id/${budgetid}`);
    }

}
