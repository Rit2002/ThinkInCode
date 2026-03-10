import { z } from 'zod';

const signupSchema = z.object({
    firstName: z.string().min(3, 'Name should contain atleast 3 char'),
    email: z.email('Invalid email'),
    password: z.string().min(8, 'Password must be of min 8 length')
});

export default signupSchema;