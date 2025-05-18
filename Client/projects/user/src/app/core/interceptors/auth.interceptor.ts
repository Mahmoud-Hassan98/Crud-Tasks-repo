import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem("token")
  if(token) {

      req= req.clone({
        setHeaders:{
          Authorization : `Bearer ${token}`
        }
      })
      console.log(1);
      
      console.log(req);
      

  }
  console.log(2);
  
  console.log(req);
  
  return next(req);
};