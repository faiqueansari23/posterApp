/**
 * @format
 */
import * as Yup from 'yup';
import {FormikHelpers, useFormik} from 'formik';

export interface ISignup {
  name: string;
  phone: string;
  password: string;
  agent_shop: string;
}

const defaultValues: ISignup = {
  name: '',
  phone:'',
  password: '',
  agent_shop:'',
};

// phoneNumber: Yup.string()
//     .matches(/^[0-9]+$/, "Phone number is not valid")
//     .min(10, 'Phone number should be at least 10 digits')
//     .max(15, 'Phone number should not exceed 15 digits')
//     .required('Please enter phone number'),
// });

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Please enter name'),
    phone: Yup.string().matches(phoneRegExp, ('Enter valid mobile number'))
    .required('Please enter Mobile number'),
  password: Yup.string()
    .required('Please enter password'),
    agent_shop: Yup.string()
    .required('Please enter shop name'),
});

export const useLoginForm = (
  onSubmit: (
    values: ISignup,
    formikHelpers: FormikHelpers<ISignup>,
  ) => void | Promise<unknown>,
  initialValues: ISignup = defaultValues,
) => {
  return useFormik<ISignup>({
    initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit,
  });
};
