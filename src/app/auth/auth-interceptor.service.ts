import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpParams} from '@angular/common/http';
import { authservice } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor (private auth:authservice){}
    intercept(req :HttpRequest<any>, next:HttpHandler){
        this.auth.user.pipe(take(1),exhaustMap(user => {
            const modifiedreq = req.clone(
                {
                    params:new HttpParams().set('auth',user.id)
                });
            return next.handle(modifiedreq);
        }));
        
    }
}