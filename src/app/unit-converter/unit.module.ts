import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout.component';
import { UnitRoutingModule } from './unit-routing.module';
import { ListComponent } from './list.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UnitRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent
    ]
})
export class UnitModule { }