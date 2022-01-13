import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SpinnerService{
    isLoading$ = new Subject<boolean>();
    isLoadingSS$ = new Subject<boolean>();

    mostrar(): void{
        this.isLoading$.next(true);
    }

    ocultar(): void{
        this.isLoading$.next(false);
    }

    mostrarSS(): void{
        this.isLoadingSS$.next(true);
    }
}