import { z } from "zod";

export const schema = z.object({
  name: z.string().min(3,{message:"name should be 3 characters"}).max(20,{message: "name shouldnt exceed 3 characters"}),
  email: z.string().email({message:"Enter valid email address"}),
  mobile: z.string().min(10,{message:"should be atleast 10 characters"}),
  hobbies: z.string().min(5,{message:"should be atleast 5 characters"})
});