import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import {Router} from '@angular/router';


export interface AuthResponseData{
    idToken:string;
    email:string;
    refreshToken:string;	
    expiresIn:string;
    localId:string;
    registered	? :string;
};

@Injectable({providedIn:'root'})
export class authservice{
private tokenExirationTimer :any;
user  = new BehaviorSubject<User>(null);
constructor(private http:HttpClient,
   private router : Router){}

onsignup(email:string,password:string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_AHf_gAjiGAG4a_E9c3zdzBaqP1aDDsw',{
    email : email,
    password :password,
    returnSecureToken : true
    }).pipe(catchError(this.handleErrors),tap(resData =>{
        this.handleAuth(resData.email,resData.localId,+resData.expiresIn,resData.idToken);
    }));
}

onlogin(email:string,password:string){
    return this.http.post<AuthResponseData>
    ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_AHf_gAjiGAG4a_E9c3zdzBaqP1aDDsw',{
        email : email,
    password :password,
    returnSecureToken : true
    }).pipe(catchError(this.handleErrors),tap(resData =>{
        this.handleAuth(resData.email,resData.localId,+resData.expiresIn,resData.idToken);
    }));

}

onlogout(){
    this.user.next(null);
    this.router.navigate(['/auth']); 
    localStorage.removeItem('userData');
    if(this.tokenExirationTimer){
        clearTimeout(this.tokenExirationTimer);
    }
    this.tokenExirationTimer = null;
}

private handleAuth (email:string , token :string,expiresIn:number,userId :string)
{
    const expirationDate = new Date(new Date().getTime() +expiresIn +1000);
    const user = new User (email,userId,token,expirationDate);
    this.user.next(user);
    //this.autologout(expiresIn*1000);
    localStorage.setItem('userData',JSON.stringify(user));
    
}

private handleErrors(errorResp : HttpErrorResponse)
{
    let errorMessage = 'An unknown error occured';
    if(!errorResp.error||!errorResp.error.error){
        return throwError(errorMessage);
    }switch(errorResp.error.error.message){
        case 'EMAIL_EXISTS':
            errorMessage='This email already exists';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'Sorry you are not registered';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'Password incorrect';
            break;
    }
    return throwError(errorMessage);
}

autologin(){
    const userData:{
        email :string;
        id:string;
        _token :string;
        _tokenExpirationDate:string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData)
    {
        return;
    }
    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
    if(loadedUser.id){
        this.user.next(loadedUser);
        const expirationDuration = new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
       // this.autologout(expirationDuration);
    }
    
}

// autologout(expirationDuration : number){
//     console.log(expirationDuration);
//    this.tokenExirationTimer =  setTimeout(() => {
//         this.onlogout();
//     }, expirationDuration);
// }
}