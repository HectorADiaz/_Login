// import { inject } from '@angular/core';
// import { CanActivateFn, Router} from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   debugger
//   const token = localStorage.getItem("token") || "";
//   const router = inject(Router);

//   if( token !="" ){
//     return true;
//     }else {
//       router.navigateByUrl("");
//       return false;
//       }
// };


import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Intenta obtener el token de localStorage
  const token = localStorage.getItem("token");

  // Si el token existe, permite el acceso a la ruta
  if (token && token !== "") {
    return true;
  } else {
    // Si no hay token, redirige al login y bloquea la ruta
    router.navigateByUrl("/login");
    return false;
  }
};