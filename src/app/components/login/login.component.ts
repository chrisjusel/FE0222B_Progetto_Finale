import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  errorMessage = undefined;

  constructor(private fb: FormBuilder, private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    this.form.valueChanges.subscribe(val => {
    })

  }

  onSubmit(dati: {username: string, password: string}){
    this.authSrv.login(dati).subscribe((res) => {
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['/dashboard']);
    })
  }

}
