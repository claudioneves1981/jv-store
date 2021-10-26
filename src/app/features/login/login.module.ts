import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppEffects } from "src/app/state/app.effects";
import { reducer } from "src/app/state/app.reducer";
import { LoginComponent } from "./login.component";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            {
                path:'',
                component: LoginComponent,
            }
        ]),
        StoreModule.forFeature('userContext',reducer),
        EffectsModule.forFeature([AppEffects]),
    ],
    declarations:[
        LoginComponent,
    ],
})

export class LoginModule {
    
}