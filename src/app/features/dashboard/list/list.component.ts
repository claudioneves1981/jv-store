import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Todo } from "src/app/shared/models/todo.model";
import { AppState } from "src/app/state/app.reducer";
import * as fromListSelectors from '../state/list.selectors';
import * as fromListActions from '../state/list.actions';
@Component({
    selector: 'jv-list',
    templateUrl: './list.component.html',
    styleUrls:['./list.component.scss']
})
export class ListComponent implements OnInit{

    list$!: Observable<Todo[]>;
    loading$!: Observable<boolean>;
    loadingMore$!: Observable<boolean>;
    shouldShowLoadingIndicator$!: Observable<boolean>;

    constructor(private store: Store<AppState>){

    }

    ngOnInit(){
       this.list$ = this.store.pipe(select(fromListSelectors.selectListEntities));
       this.loading$ = this.store.pipe(select(fromListSelectors.selectListLoading));
       this.loadingMore$ = this.store.pipe(select(fromListSelectors.selectListLoadingMore));
    
       this.shouldShowLoadingIndicator$ = combineLatest([
           this.loading$,
           this.loadingMore$
       ])
       .pipe(
           map(([loading, loadingMore])=> loading || loadingMore),
       );
    
    }

    markAsDone(id: number){

    }

    onDelete(id: number){

    }

    loadMore(){
        this.store.dispatch(fromListActions.loadMore());
    }
}