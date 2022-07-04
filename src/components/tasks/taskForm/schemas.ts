import * as Yup from "yup";

export const initialValues = {
    title: "",
    description: "",
};

export const validationSchema = {
    title: Yup.string().required("El título de la tarea es obligatorio"),
    description: Yup.string()
}