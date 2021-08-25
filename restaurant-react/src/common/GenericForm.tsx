import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { ReactNode, useRef } from 'react';
import { ObjectSchema, ValidationError } from 'yup';

type GenericFormProps = {
  children: ReactNode;
  validationSchema?: ObjectSchema<any>;
  onValidate: (data: any, id?: number) => void;
  initialData?: any;
  className?: string;
};

export default function GenericForm({
  children,
  validationSchema,
  onValidate,
  initialData,
  className
}: GenericFormProps) {
  const formRef = useRef<FormHandles>(null);

  async function handleSubmit(data = {}) {
    try {
      formRef?.current?.setErrors({});

      if (validationSchema) {
        await validationSchema.validate(data, {
          abortEarly: false
        });
      }

      if (initialData?.id) {
        onValidate(data, initialData.id);
      } else {
        onValidate(data);
      }
    } catch (err) {
      const validationErrors: { [key: string]: string } = {};

      if (err instanceof ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path as string] = error.message;
        });

        formRef?.current?.setErrors(validationErrors);
      }
    }
  }

  return (
    <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit} className={className}>
      {children}
    </Form>
  );
}
