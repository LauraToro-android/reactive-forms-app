import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent { 
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    //en el primer campo vacio se puede asignar uno de los dos generos defecto.. 'M'
    gender: [  , Validators.required],
    wantNotifications: [true],
    termAndConditions: [false, Validators.requiredTrue],
  });
  //El boton guardar de tipo submit volvera a resaltar los campos requeridos
  onSubmit(){
    this.myForm.markAllAsTouched();
  }
}
