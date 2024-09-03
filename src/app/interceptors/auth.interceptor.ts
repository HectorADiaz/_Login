import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  

  if(req.url.indexOf("Login")>0) return next(req);

  
  
  const token = localStorage.getItem("token");
  
    // Clonar la solicitud y agregar el encabezado de autorización
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

  debugger
  return next(clonedRequest);
};
