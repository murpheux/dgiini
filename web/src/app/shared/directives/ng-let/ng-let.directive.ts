import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

interface NgLetContext<T> {
    ngLet: T;
}

@Directive({
    selector: '[appNgLet]'
})
export class NgLetDirective<T> {
    // tslint:disable-next-line: variable-name
    private _context: NgLetContext<T> = {ngLet: null};

    // tslint:disable-next-line: variable-name
    constructor(_viewContainer: ViewContainerRef, _templateRef: TemplateRef<NgLetContext<T>>) {
        _viewContainer.createEmbeddedView(_templateRef, this._context);
    }

    @Input()
    set ngLet(value: T) {
        this._context.ngLet = value;
    }
}
