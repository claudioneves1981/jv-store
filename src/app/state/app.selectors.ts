import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.reducer";

export const selectUserName = createSelector(
    createFeatureSelector('userContext'),
    (state: AppState) => state.user.name,
);