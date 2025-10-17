import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    },2500);
  });
}

export class FormUtils{
  //Expresiones regulares para validar inputs 
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
 
  static getTextError(errors: ValidationErrors){

        for (const key of Object.keys(errors)){
            switch(key){
                case 'required':
                  return 'Este campo es requerido';

                case 'minlength':
                  return `Minimo de ${errors['minlength'].requiredLength } caracteres.`;

                case 'min':
                  return `Minimo de ${errors['min'].min }`;

                case 'email':
                  return 'El correo electrónico no es valido';

                case 'emailTaken':
                  return 'El correo electrónico ya esta siendo usado por otro usuario';
                  
                case 'notStrider':
                  return 'No se pueder usar el username strider';

                case 'pattern':
                  if (errors['pattern'].requiredPattern == FormUtils.emailPattern){
                    return 'El correo electrónico no esta permitido';
                  }
                  return 'Error de patrón contra expresión regular';
                
            }
        }
        return null;
  }

  static isValidField(form: FormGroup, fieldName : string): boolean | null {
    return (!!form.controls[fieldName].errors && form.controls[fieldName].touched);
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if( !form.controls[fieldName]) return null;
    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
    }

  

  static isValidFieldInArray( formArray: FormArray, index: number){
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if( formArray.controls.length == 0) return null;
    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);
  }
  static ifFieldOneEqualFieldTwo(field1: string, field2: string){
    return (FormGroup: AbstractControl) => {
      const field1Value = FormGroup.get(field1)?.value;
      const field2Value = FormGroup.get(field2)?.value;

      return field1Value == field2Value ? null : { passwordsNotEquals: true};
    };
  }

  static async chekingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {

    await sleep();

    const formValue = control.value;

    if(formValue == 'hola@mundo.com'){
      return {
        emailTaken: true,
      };
    }

    return null
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    return value == 'strider' ? {notStrider: true}: null
  }
}