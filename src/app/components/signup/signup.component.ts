import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

interface SignupData{
  username: string;
  email: string;
  password: string;
  nome: string | null;
  cognome: string | null;
  role: string[];
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  errorMessage = undefined;
  form!: FormGroup;
  dataPackage!: SignupData;
  constructor(private fb: FormBuilder, private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      nome: new FormControl(null),
      cognome: new FormControl(null),
      role: new FormControl('')
    });
    this.form.valueChanges.subscribe(val => {
    })
  }

  onSubmit(data: any){
    let temp: any = {
      username: data.username,
      email: data.email,
      password: data.password,
      nome: data.nome,
      cognome: data.cognome,
      role: []
    }
    temp.role.push(data.role);
    console.log(temp);
    this.authSrv.signup(temp).subscribe((res) => {
      console.log(res)
      this.router.navigate(['/login']);
    });
  }

}
