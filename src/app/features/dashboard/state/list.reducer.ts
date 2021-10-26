import { Action, createReducer, on } from "@ngrx/store";
import { Todo } from "src/app/shared/models/todo.model";
import * as fromListActions from './list.actions';

export interface ListState{
    entities: Todo[];
    loading: boolean;
    loadingMore: boolean;
    error: boolean;
    page: number;
    creating: boolean;
    removing: boolean;
}

export const listInitialState: ListState = {
    entities:[],
    loading: false,
    loadingMore: false,
    error: false,
    page: 0,
    creating: false,
    removing: false,
};

export const reducer = createReducer(
    listInitialState,
    on(fromListActions.loadListFromLastTodos, fromListActions.loadListFromList, state =>({
        ...state,
        entities:[],
        loading: true,
        page: 0,
    })),
    on(fromListActions.loadMore, state =>({
        ...state,
        loadingMore: true,
        page: state.page + 1,
    })),
    on(fromListActions.loadListSuccess,(state,{entities})=>({
        ...state,
        entities:[...state.entities, ...entities],
        loading: false,
    })),
    on(fromListActions.loadListFailure,state =>({
        ...state,
        loading: false,
        error: true,
    })),
    on(fromListActions.createTodo,state => ({
        ...state,
        creating: true,
    })),
    on(fromListActions.createTodoSuccess, state =>({
        ...state,
        creating: false,
    })),
    on(fromListActions.createTodoFailure, state =>({
        ...state,
        creating: false,
        error: true,
    })),
    on(fromListActions.removeTodo, state =>({
        ...state,
        removing: true,
    })),
    on(fromListActions.removeTodoSuccess, state =>({
        ...state,
        removing: false,
    })),
    on(fromListActions.removeTodoFailure, state =>({
        ...state,
        removing: false,
        error: true,
    })),
    on(fromListActions.notifyHydrated, state =>({
        ...state,
        entities:[...state.entities],
        page: state.page,
    })),
);

export function listReducer(state: ListState | undefined, action: Action):ListState{
    return reducer(state, action);
}