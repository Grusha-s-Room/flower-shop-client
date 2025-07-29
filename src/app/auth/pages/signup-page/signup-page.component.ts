import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-signup-page',
  imports: [ReactiveFormsModule],
  templateUrl: './signup-page.component.html'
})
export class SignupPageComponent {

  authService = inject( AuthService );
  fb = inject( FormBuilder );
  hasError = signal( false );
  router = inject( Router );

  signupForm = this.fb.group ({
    name : ['',[Validators.required]],
    surname : ['',[Validators.required]],
    phone : ['', [Validators.required, Validators.minLength(10)]],
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(10)]]
  })
  
  onSubmit () {
    if ( this.signupForm.invalid ) {
      this.hasError.set( true );
      setTimeout( () => {
        this.hasError.set( false );
      }, 2000 );
      return;
    }
    const { name = '', surname = '', phone = '', email = '', password = '' }  = this.signupForm.value;
    
    const newUser : User = {
      name,
      surname,
      phone : '+52' + phone,
      email,
      password
    }

    this.authService.signUp( newUser ).subscribe({
      next: ( response ) => {
        console.log('Respuesta del servidor.', response );
        this.router.navigateByUrl('/login');
      },
      error: ( error ) => {
        console.error('Error al enviar el POST: ', error);
      }
    })

  }

}
