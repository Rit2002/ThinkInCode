import { z } from 'zod';

const loginSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(8, 'Password must be of min 8 length')
});

export default loginSchema;