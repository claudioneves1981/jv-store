import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CreateTodoComponent } from "./create-todo/create-todo.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LastTodosComponent } from "./last-todos/last-todos.component";
import { ListComponent } from "./list/list.component";
import { ListEffects } from "./state/list.effects";
import { listReducer } from "./state/list.reducer";

@NgModule({
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path:'d',
                component: DashboardComponent,
            },
            {
                path:'list',
                component: ListComponent,
            },
        ]),
        StoreModule.forFeature('list',listReducer),
        EffectsModule.forFeature([ListEffects]),
    ],
    declarations:[
        DashboardComponent,
        LastTodosComponent,
        CreateTodoComponent,
        ListComponent,
    ],
})
export class DashboardModule{

}