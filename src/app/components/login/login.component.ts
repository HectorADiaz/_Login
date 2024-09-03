import { Component, inject } from '@angular/core';
import { AccesoService } from '../../services/acceso.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login } from '../../interfaces/Login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  // styleUrl: './login.component.css'

})
export class LoginComponent {
  private accesoService = inject(AccesoService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  public formLogin: FormGroup = this.formBuild.group({
    username: ['', Validators.required],
    password: ['', Validators.required] 
  })

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
        this.showInvalidCredentialsAlert("Credenciales Incorrectas");
      } else {
        console.log('Error:', error.message);
      }
  }
}
