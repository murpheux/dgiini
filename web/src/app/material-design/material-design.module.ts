import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [],
    imports: [FormsModule, ReactiveFormsModule, CommonModule, MatDialogModule],
    exports: [FormsModule, ReactiveFormsModule, MatDialogModule],
})
export class MaterialDesignModule {}
