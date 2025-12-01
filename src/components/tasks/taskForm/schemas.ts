import * as Yup from "yup";

export const initialValues = {
    title: "",
    description: "",
    dueDate: new Date(),
    list: "",
    priority: 4
};

export const validationSchema = {
    title: Yup.string().required("El título de la tarea es obligatorio"),
    description: Yup.string(),
    list: Yup.string().required("Dede seleccionar una lista para la tarea"),
}