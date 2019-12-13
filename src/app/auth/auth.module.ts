import { NgModule } from '../../../node_modules/@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '../../../node_modules/@angular/common';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { RouterModule } from '../../../node_modules/@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([{
           path: '', component: AuthComponent 
        }]),
        SharedModule
    ]
})

export class AuthModule {}