import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/state/app.reducer";
import * as fromAppActions from '../../state/app.actions';
import * as fromAppSelectors from '../../state/app.selectors';

@Component({
    templateUrl: './login.component.html',
    styleUrls:['./login.component.scss'],
})

export class LoginComponent implements OnInit{

    form = new FormGroup({
        name: new FormControl(''),
        email: new FormControl('')
    });

    username$!: Observable<string>;

    constructor(private store: Store<AppState>){
    }

    ngOnInit(){
        this.username$ = this.store.pipe(select(fromAppSelectors.selectUserName));
    }

    login(){
       this.store.dispatch(fromAppActions.doLogin(this.form.value));
    }
}