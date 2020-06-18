import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { authservice ,AuthResponseData} from './auth.service';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import {  Router } from '@angular/router';



@Component({
    selector : 'app-auth',
    templateUrl : './auth.component.html'
})

export class auth{
    isloginmode = true;
    isloading = false;
    error:string=null;

    constructor(private authserv:authservice,
        private route :Router){}
    onswichmode(){
        this.isloginmode=!this.isloginmode;
    }

    onsubmit(form :NgForm){
        if(!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        let authObs : Observable<AuthResponseData>;

        this.isloading=true;
        if(this.isloginmode){
           authObs = this.authserv.onlogin(email,password);
        }
        else{
            authObs = this.authserv.onsignup(email,password);
            }
            authObs.subscribe(
                respdata=>{
                    console.log(respdata);
                    this.isloading=false;
                    this.route.navigate(['/recipes']);
                },
                errorMessage =>{
                    console.log(errorMessage);
                    this.error = errorMessage;
                    this.isloading=false;
                });
        form.reset();
    }
}
