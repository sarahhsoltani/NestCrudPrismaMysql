import { z } from "zod";

export const UpdateTaskDtoSchema =z.object({
    title:z.string(),
    description:z.string(),
    statut:z.enum(["IN PROGRESS" ,"DONE"])
}).required()
export type UpdateTaskDtoType=z.infer< typeof UpdateTaskDtoSchema>
