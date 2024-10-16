import { FastifyPluginAsync } from "fastify";
import { ComentarioSchema } from "../../types/comentarios.js";
import { query } from "../../services/db.js";

const comentariosRoutes: FastifyPluginAsync = async (
    fastify,
    opts
): Promise<void> => {
    fastify.get("/", {
        onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
        handler: async function (request, reply) {
            const response = await query("SELECT * FROM comentarios")
            return response;
        },
    });
    fastify.post("/", {
        schema: {
            body: ComentarioSchema
        },
        onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
        handler: async function (request, reply) {
            const comentario = request.body as ComentarioSchema;
            try {
                await query("INSERT INTO comentarios(id_tarea, id_usuario, fecha_ingresado, titulo, descripcion) VALUES($1, $2, $3, $4, $5)"), [comentario.id_tarea, comentario.id_usuario, comentario.fecha_ingresado,
                comentario.titulo, comentario.descripcion];
                return reply.status(201).send(request.body);
            } catch (error) {
                return reply.status(500).send(error);
            }
        },
    });
    fastify.put("/:id", {
        onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
        handler: async function (request, reply) {
            return;
        },
    });
    fastify.delete("/:id", {
        onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
        handler: async function (request, reply) {
            return;
        },
    });
    fastify.get("/:id", {
        onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
        handler: async function (request, reply) {
            return;
        },
    });

};
export default comentariosRoutes;
