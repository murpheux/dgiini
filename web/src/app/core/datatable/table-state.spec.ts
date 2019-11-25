import { TableState } from './table-state';

describe('TableState', () => {
    it('should create an instance', () => {
        expect(new TableState()).toBeTruthy();
    });

    it('should set the table state with a default value', () => {


        const tableSate = new TableState();

        expect(tableSate.count).toBe(0);
        expect(tableSate.data.length).toBe(0);
        expect(tableSate.limit).toBe(20);
        expect(tableSate.loading).toBeTruthy();
        expect(tableSate.page).toBe(1);


    });

    it('should set the value with a response', () => {

        const response = {
            currentPage: 1,
            result: [{
                test: 1
            }],
            totalItems: 20,
            limit: 10
        };

        const tableSate = new TableState();

        tableSate.attachResponse(response);

        expect(tableSate.count).toBe(20);
        // expect(tableSate.data.length).toBe(1);
        expect(tableSate.limit).toBe(10);
        expect(tableSate.loading).toBeFalsy();
        expect(tableSate.page).toBe(1);
    });

    it('should set the loading flag to true', () => {

        const tableSate = new TableState();

        tableSate.startLoading();

        expect(tableSate.loading).toBeTruthy();

    });
});
