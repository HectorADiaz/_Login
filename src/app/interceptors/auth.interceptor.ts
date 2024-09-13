import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  

  debugger
  if (req.url.includes("login")) return next(req);

  
  
  const token = localStorage.getItem("token");
  
    // Clonar la solicitud y agregar el encabezado de autorización
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

  return next(clonedRequest);
};
