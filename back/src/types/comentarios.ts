import { Static, Type } from "@sinclair/typebox";

export const ComentarioSchema = Type.Object({
    id_tarea: Type.String({
        minLength: 1,
        pattern: "^[^\\d]+$",
    }),
    id_usuario: Type.String({
        minLength: 1,
        pattern: "^[^\\d]+$",
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
