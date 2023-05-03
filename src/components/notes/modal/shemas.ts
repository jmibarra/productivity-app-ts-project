import * as Yup from "yup";

export const initialValues = {
    title: "",
    content: "",
    favorite: false,
    color: ""
};

export const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string(),
    favorite: Yup.boolean(),
    color: Yup.string(),
  })
  
  