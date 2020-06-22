import {Component,EventEmitter,Output, OnInit, OnDestroy} from '@angular/core';
import { datastorageservice } from '../shared/data-storage.service';
import { authservice } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector:'app-header',
    templateUrl :'./header.component.html'
})

export class HeaderComponent implements OnInit,OnDestroy{

    private usersub :Subscription;
    isauthenticated = false;
    constructor (private datastorageservice:datastorageservice,
        private auth :authservice){
    }

    ngOnInit(){
        this.usersub = this.auth.user.subscribe(user =>{
            
                this.isauthenticated=!!user;
            
        });
    }

    ngOnDestroy(){
        this.usersub.unsubscribe();
    }
    onsave(){
this.datastorageservice.savedata();
    }

    fetchdata(){
        this.datastorageservice.fetchdata().subscribe();
    }

    onlogout(){
        this.auth.onlogout();
    }
}