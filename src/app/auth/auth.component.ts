import {Component, ComponentFactoryResolver, ViewChild, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { authservice ,AuthResponseData} from './auth.service';
import { NgModule } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {  Router } from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';


@Component({
    selector : 'app-auth',
    templateUrl : './auth.component.html'
})

export class auth implements OnDestroy{
    isloginmode = true;
    isloading = false;
    error:string=null;
    @ViewChild(PlaceholderDirective , {static:false}) alertHost:PlaceholderDirective;
    private closesub : Subscription;

    ngOnDestroy(){
        if(this.closesub)
        {
            this.closesub.unsubscribe();
        }
    }
    constructor(private authserv:authservice,
        private route :Router ,private componentFactoryResolver : ComponentFactoryResolver){}
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
                    this.showerroralert(errorMessage);
                    this.isloading=false;
                });
        form.reset();
    }

    onHandleError(){
        this.error=null;
    }

    private showerroralert(message :string){
        const altercmpfactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

       const componentref = hostViewContainerRef.createComponent(altercmpfactory);
       componentref.instance.message = message;
       this.closesub =  componentref.instance.close.subscribe(() =>
       {
        this.closesub.unsubscribe();
        hostViewContainerRef.clear();
       });
    }
}
