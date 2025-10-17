import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent { 
  private fb = inject(FormBuilder);
  formUtils = FormUtils;
  
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)], 
    //Segunda validación asíncrona... de email
    [FormUtils.chekingServerResponse]],
    username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.notOnlySpacesPattern), FormUtils.notStrider,]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  }, {
    validators: [FormUtils.ifFieldOneEqualFieldTwo('password', 'confirmPassword')],
  });



  onSave(){
    if (this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    this.myForm.reset()
  }
  onSubmit(){
    this.myForm.markAllAsTouched();
  }
}
