import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDigitOnly]'
})
export class DigitOnlyDirective {
    private navigationKeys = [
        'Backspace',
        'Delete',
        'Tab',
        'Escape',
        'Enter',
        'Home',
        'End',
        'ArrowLeft',
        'ArrowRight',
        'Clear',
        'Copy',
        'Paste'
    ];
    inputElement: HTMLElement;
    constructor(public el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
        this.inputElement = el.nativeElement;
    }

    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent) {
        if (
            // Allow: Delete, Backspace, Tab, Escape, Enter
            ['46', '8', '9', '27', '13'].indexOf(e.key) !== -1 ||
            (e.key === '65' && e.ctrlKey === true) || // Allow: Ctrl+A
            (e.key === '67' && e.ctrlKey === true) || // Allow: Ctrl+C
            (e.key === '86' && e.ctrlKey === true) || // Allow: Ctrl+V
            (e.key === '88' && e.ctrlKey === true) || // Allow: Ctrl+X
            (e.key === '65' && e.metaKey === true) || // Cmd+A (Mac)
            (e.key === '67' && e.metaKey === true) || // Cmd+C (Mac)
            (e.key === '86' && e.metaKey === true) || // Cmd+V (Mac)
            (e.key === '88' && e.metaKey === true) || // Cmd+X (Mac)
            (e.key >= '35' && e.key <= '39') // Home, End, Left, Right
        ) {
            return;  // let it happen, don't do anything
        }
        // Ensure that it is a number and stop the keypress
        if (
            (e.shiftKey || (e.key < '48' || e.key > '57')) &&
            (e.key < '96' || e.key > '105')
        ) {
            e.preventDefault();
        }
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent) {
        event.preventDefault();
        const pastedInput: string = event.clipboardData
            .getData('text/plain')
            .replace(/\D/g, ''); // get a digit-only string
        document.execCommand('insertText', false, pastedInput);
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault();
        const textData = event.dataTransfer
            .getData('text').replace(/\D/g, '');
        this.inputElement.focus();
        document.execCommand('insertText', false, textData);
    }

}
