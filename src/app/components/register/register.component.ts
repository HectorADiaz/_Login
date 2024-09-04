import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccesoService } from '../../services/acceso.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  private accesoService = inject(AccesoService);
  private router = inject(Router);
  private formBuild = inject(FormBuilder);

  
  public formRegistro: FormGroup = this.formBuild.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    // confirmPassword : ['', Validators.required],
    email: ['', Validators.required],
    roleId: ['', Validators.required],
    createBy:[''] // TODO despues debe ser requerido 

  })

  registro(){
    if(this.formRegistro.invalid) return

    const objeto: User = {
      username : this.formRegistro.value.username,
      password : this.formRegistro.value.password,
      confirmPassword : this.formRegistro.value.confirmPassword,

      email : this.formRegistro.value.email,
      roleId : this.formRegistro.value.roleId,
      createBy : null,
    }

    this.accesoService.register(objeto).subscribe({
      next: (data) => {
        if (data.body.username) {
          this.router.navigate(['dashboard'])
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

  volver(){
    this.router.navigate(['dashboard'])
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
