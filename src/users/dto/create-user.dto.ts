import { z } from "zod";

export const CreateUserDtoSchema=z.object({
    name:         z.string(),
    email:        z.string(),  
    password :    z.string(),
    birthday :    z.string().datetime(),  
})
.required()
export type CreateUserDtoType=z.infer<typeof CreateUserDtoSchema>