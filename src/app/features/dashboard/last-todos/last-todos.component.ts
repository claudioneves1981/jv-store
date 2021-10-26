import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Todo } from "src/app/shared/models/todo.model";
import { AppState } from "src/app/state/app.reducer";
import * as fromListActions from '../state/list.actions';
import * as fromListSelectors from '../state/list.selectors';

@Component({
    selector: 'jv-last-todos',
    templateUrl: './last-todos.component.html',
    styleUrls:['./last-todos.component.scss']
})
export class LastTodosComponent implements OnInit{

    list$!: Observable<Todo[]>;
    loading$!: Observable<boolean>;

    constructor(private store: Store<AppState>){

    }

    ngOnInit(){
       this.store.dispatch(fromListActions.loadListFromLastTodos());
       this.list$ = this.store.pipe(select(fromListSelectors.selectListEntities));
       this.loading$ = this.store.pipe(select(fromListSelectors.selectListLoading));
    }

    markAsDone(id: number){

    }
}