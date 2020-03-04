import { filter, map } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

export class TableState {

    page: number;
    data: [];
    count: number;
    limit: number;
    loading: boolean;
    orderBy: string;
    orderDirection: string;
    filters: Map<string, string>;

    constructor() {
        this.page = 1;
        this.data = [];
        this.count = 0;
        this.limit = 20;
        this.loading = true;
        this.filters = new Map<string, string>();
    }

    startLoading(): void {
        this.loading = true;
    }

    // attachResponse(response: any): void {
    //     this.page = response.currentPage;
    //     this.data = response.payload.result;
    //     this.count = response.totalItems;
    //     this.limit = response.limit;
    //     this.loading = false;
    // }

    setOrdering(columnName: string): void {
        if (this.orderBy === columnName) {
            this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.orderBy = columnName;
            this.orderDirection = 'asc';
        }
    }

    setFilter(columnName: string, value: string) {
        if (value) {
            this.filters.set(columnName, value);
        } else {
            if (this.filters.has(columnName)) {
                this.filters.delete(columnName);
            }
        }
    }
}
