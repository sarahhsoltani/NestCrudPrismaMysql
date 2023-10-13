import { z } from "zod";

export const UpdateUserDtoSchema=z.object({
    name:         z.string(),
    email:        z.string(),  
    password :    z.string(),
    birthday :    z.string().datetime(),  
})
.required()
export type UpdateUserDtoType=z.infer<typeof UpdateUserDtoSchema>