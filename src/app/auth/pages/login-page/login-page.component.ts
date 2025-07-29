import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-sigin-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {

  authService = inject( AuthService );
  fb = inject( FormBuilder );
  router = inject(Router);
  hasError = signal( false );
  
  loginForm = this.fb.group ({
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(10)]]
  })

  onSubmit () {
    if( this.loginForm.invalid ) {
      this.hasError.set( true );
      setTimeout( () => {
        this.hasError.set( false );
      }, 2000 );
      return;
    }
    const { email = '', password = ''} = this.loginForm.value;
    this.authService.logIn( email!, password! ).subscribe({
      next: ( response ) => {
        console.log( 'Respuesta del servidor. ', response );
        this.router.navigateByUrl( '/' );
      },
      error: ( error ) => {
        console.error( 'Error al enviar el POST: ', error );
      }
    })
  }

}
