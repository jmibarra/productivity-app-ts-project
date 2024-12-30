import * as Yup from "yup";

export const initialValues = {
    title: "",
    description: "",
    dueDate: new Date(),
};

export const validationSchema = {
    title: Yup.string().required("El título de la tarea es obligatorio"),
    description: Yup.string()
}