import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { Todo } from "../models/todo.model";
import { delay, mergeMap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class TodosService{

    private todo!: Todo[];
    
    getList(page: number): Observable<Todo[]>{
        const start = page * 10;
        return of(this.getEntities().slice(start, start+10))
        .pipe(delay(2000));
    }

    toggleDone(id: number): Observable<Todo>{
        let todo!: Todo;
        this.getEntities().forEach(item =>{
            if(item.id === id){
                todo = item;
                item.done = !item.done;
            }
        });
        return !!todo ? of(todo): throwError(`Todo com id: ${id} não existe.`);
    }

    create(todo: Partial<Todo>):Observable<Todo>{
        const id = this.getEntities()[0].id+1;
        const createdAt = new Date();
        const entity: Todo = {
            id,
            createdAt,
            title: todo.title,
            done: false,
        }
        this.setEntities([entity, ...this.getEntities()]);
        return of(entity)
        .pipe(delay(2000));
    }

    remove(id: number): Observable<boolean | never>{
        const length = this.getEntities().length;
        const filtered = this.getEntities().filter(item => item.id !== id);
        this.setEntities(filtered);
        return of('')
        .pipe(
            delay(2000),
            mergeMap(()=> filtered.length === length ?
            throwError(`Todo com id ${id} não existe `)
            : of(true),
            ),
        );
    }

    getEntities(): Todo[]{
        return this.todo;
    }

    setEntities(todo: Todo[]){
        this.todo = todo;
    }
}


