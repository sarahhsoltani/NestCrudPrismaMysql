import { z } from "zod";

export const CreateTaskDtoSchema =z.object({
    title:z.string().nonempty(),
    description:z.string(),
    statut:z.enum(["IN PROGRESS" ,"DONE"])
}).required()
export type CreateTaskDtoType=z.infer< typeof CreateTaskDtoSchema>
