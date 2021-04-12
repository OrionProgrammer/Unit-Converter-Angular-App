import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Unit } from '../_models';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UnitSignalRService {
    public data = new Subject<Unit>();

    private hubConnection: signalR.HubConnection

    onData(): Observable<Unit> {
        return this.data.asObservable();
    }

    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('http://localhost:4000/unit')
            .build();

        this.hubConnection
            .start()
            .catch(err => console.log('Error while starting connection: ' + err))
    }

    public stopConnection = () => {
        this.hubConnection
            .stop()
            .catch(err => console.log('Error while stopping connection: ' + err))
    }

    public addListener = () => {
        this.hubConnection.on('unitModelResult', (data) => {
            this.data.next(data);
        });
    }

}