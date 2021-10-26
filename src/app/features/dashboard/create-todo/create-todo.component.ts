import { Component, OnInit} from "@angular/core";
import { FormControl } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable, Subject } from "rxjs";
import { AppState } from "src/app/state/app.reducer";
import * as fromListSelectors from "../state/list.selectors";
import * as fromListActions from "../state/list.actions";
import { pairwise, takeUntil } from "rxjs/operators";
@Component({
    selector: 'jv-create-todo',
    templateUrl: './create-todo.component.html',
    styleUrls:['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit{

titleControl = new FormControl('');

creating$!: Observable<boolean>;

private componentDestroyed$ = new Subject();

    constructor(private store: Store<AppState>){
    }

    ngOnInit(){
        this.creating$ = this.store.pipe(select(fromListSelectors.selectListCreating));

        this.creating$
        .pipe(
            pairwise(),
            takeUntil(this.componentDestroyed$),
        )
        .subscribe(([oldCreating, creating])=>{
            if(oldCreating && !creating){
                this.titleControl.setValue('');
            }
        });
    }

    ngOnDestroy(){
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
                 
    save(){
       this.store.dispatch(fromListActions.createTodo({title: this.titleControl.value}));
    }
}