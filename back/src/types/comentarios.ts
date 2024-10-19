import { Static, Type } from "@sinclair/typebox";

export const ComentarioSchema = Type.Object({
    id_tarea: Type.String({
        minLength: 1,
        pattern: "^[0-9]+$",
    }),
    id_usuario: Type.String({
        minLength: 1,
        pattern: "^[0-9]+$",
    }),
    fecha_ingresado: Type.String({
        format: "date-time",
    }),
    titulo: Type.String({
        minLength: 3,
        maxLength: 20,
    }),
    descripcion: Type.String({
        minLength: 3,
        maxLength: 100,
    }),
});

export type ComentarioSchema = Static<typeof ComentarioSchema>;
