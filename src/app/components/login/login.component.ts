import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';
import { CommonModule } from '@angular/common';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  // styleUrl: './login.component.css'

})
export class LoginComponent {
  private accesoService = inject(AccesoService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  loginError: boolean = false; // Bandera para controlar el mensaje de error

  public formLogin: FormGroup = this.formBuild.group({
    username: ['', [Validators.required, Validators.pattern('^.{3,20}$')]],
    password: ['', [Validators.required, Validators.pattern('^.{8,}$')]] 
  })

  constructor(private toastr:  ToastrService){}

  // Método genérico para validar controles
  isFieldInvalid(fieldName: string): boolean {
    const control = this.formLogin.get(fieldName);
    return (control?.invalid && (control.touched || control.dirty)) ?? false;
  }
    // Accesores para los campos individuales
    get isUsernameInvalid() {
      return this.isFieldInvalid('username');
    }
    get isPasswordInvalid() {
      return this.isFieldInvalid('password');
    }

  iniciarSesion(){
    if(this.formLogin.invalid) return

    const objeto:Login = {
      username : this.formLogin.value.username,
      password : this.formLogin.value.password
    }

 
    this.accesoService.login(objeto).subscribe({
      next: (data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          this.router.navigate(["dashboard"]);
        } 
        // else {
        //   this.handleLoginError(data)
        // }
      },
      error: (error) => {
        this.handleLoginError(error)
      }
    });    
  }
  
  private showInvalidCredentialsAlert(msj: string) {
    alert(msj);
  }
  private handleLoginError(error: any) {
      if (error.status === 401) {
        this.loginError = true;
        this.toastr.error('Credenciales Incorrectas','Error')
        setTimeout(() => {
          this.loginError = false;
        }, 5000); // 5000 ms = 5 segundos
      } else {
        console.log('Error:', error.message);
      }
  }
  
}
