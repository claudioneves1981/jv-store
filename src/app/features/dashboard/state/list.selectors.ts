import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ListState } from "./list.reducer";

//export const selectListState = createFeatureSelector('list');

export const selectListEntities = createSelector(
    createFeatureSelector('list'),
    (state: ListState) => state.entities,
);

export const selectListLoading = createSelector(
    createFeatureSelector('list'),
    (state: ListState) => state.loading,
);

export const selectListLoadingMore = createSelector(
    createFeatureSelector('list'),
    (state: ListState) => state.loadingMore,
);

export const selectListError= createSelector(
    createFeatureSelector('list'),
    (state: ListState) => state.error,
);

export const selectListPage= createSelector(
    createFeatureSelector('list'),
    (state: ListState) => state.page,
);

export const selectListCreating= createSelector(
    createFeatureSelector('list'),
    (state: ListState) => state.creating,
);