  import { Component, inject } from '@angular/core';
  import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
  import { Router } from '@angular/router';
  import { AccesoService } from '../../services/acceso.service';
  import { User } from '../../interfaces/User';
  import { CommonModule } from '@angular/common';
import { RegisterResponse } from '../../interfaces/ResponseAcceso';
import { Toast, ToastrService } from 'ngx-toastr';

  @Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
  })
  export class RegisterComponent {
    
    private accesoService = inject(AccesoService);
    private router = inject(Router);
    private formBuild = inject(FormBuilder);

    // Definir el formulario con los validadores
    public formRegistro: FormGroup = this.formBuild.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{3,20}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      roleId: ['2', [Validators.required, Validators.pattern('^[0-9]+$')]],
      createBy: ['', Validators.pattern('^[0-9]+$')] // Por ahora no es requerido
    }, { validators: this.passwordsMatchValidator }); // Agregar el validador personalizado
    
  constructor(private toastr:  ToastrService){}
    // Método para validar si las contraseñas coinciden
    passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      
      return password === confirmPassword ? null : { passwordsMismatch: true };
    }

    // Método genérico para validar controles
    isFieldInvalid(fieldName: string): boolean {
      const control = this.formRegistro.get(fieldName);
      return (control?.invalid && (control.touched || control.dirty)) ?? false;
    } 


    // Accesores para los campos individuales
    get isUsernameInvalid() {
      return this.isFieldInvalid('username');
    }

    get isPasswordInvalid() {
      return this.isFieldInvalid('password');
    }

    get isConfirmPasswordInvalid() {

      return this.isFieldInvalid('confirmPassword');
    }

    get isEmailInvalid() {
      return this.isFieldInvalid('email');
    }

    get isRoleIdInvalid() {
      return this.isFieldInvalid('roleId');
    }

    get isCreateByInvalid() {
      return this.isFieldInvalid('createBy');
    }
  
    registro() {
      if (this.formRegistro.invalid) return;

      const objeto: User = {
        username: this.formRegistro.value.username,
        password: this.formRegistro.value.password,
        confirmPassword: this.formRegistro.value.confirmPassword,
        email: this.formRegistro.value.email,
        roleId: this.formRegistro.value.roleId,
        createBy: null,
      };

        this.accesoService.register(objeto).subscribe({
          next: (data: RegisterResponse) => {
            console.log(data);
        
            if (data.status === 201) {
              this.formRegistro.reset(); // Limpia el formulario
              this.toastr.success('Usuario Agregado','Completado')
      
            }
          },
          error: (error) => {
            this.handleLoginError(error);
          }
        });
 
    }

    
 

    volver() {
      this.router.navigate(['dashboard']);
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
