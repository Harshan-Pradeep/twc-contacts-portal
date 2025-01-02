import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
    ValidationError,
  } from '@nestjs/common';
  import { validate } from 'class-validator';
  import { plainToClass } from 'class-transformer';
  
  /**
   * Custom validation pipe that provides detailed error messages
   * and transforms incoming data to DTO classes
   */
  @Injectable()
  export class CustomValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
      if (!metatype || !this.toValidate(metatype)) {
        return value;
      }
  
      const object = plainToClass(metatype, value);
      const errors = await validate(object);
  
      if (errors.length > 0) {
        throw new BadRequestException({
          message: 'Validation failed',
          errors: this.formatErrors(errors),
        });
      }
  
      return object;
    }
  
    private toValidate(metatype: Function): boolean {
      const types: Function[] = [String, Boolean, Number, Array, Object];
      return !types.includes(metatype);
    }
  
    private formatErrors(errors: ValidationError[]): any[] {
      return errors.map(error => ({
        field: error.property,
        constraints: error.constraints,
        value: error.value,
        children: error.children?.length ? this.formatErrors(error.children) : undefined,
      }));
    }
  }