import { z } from 'zod';
const capitalizeFormat = (value: string) => /^[A-Z][a-z]*$/.test(value);
const userNameValidation = z.object({
  firstName: z
    .string()
    .max(25, { message: 'First Name cannot be more than 25 characters' })
    .trim()
    .refine(capitalizeFormat, {
      message: 'First name must be in capitalized format',
    }),
  lastName: z
    .string()
    .max(25, { message: 'Last Name cannot be more than 25 characters' })
    .trim()
    .refine(capitalizeFormat, {
      message: 'First name must be in capitalized format',
    }),
});

const addressValidation = z.object({
  street: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
});

const orderValidation = z.object({
  productName: z
    .string()
    .min(5, { message: 'Product name must be more than 5 characters' })
    .trim(),
  price: z.number().gt(0, { message: 'Price must be greater than zero' }),
  quantity: z.number().gt(0, { message: 'Quantity must be greater than zero' }),
});

const userValidation = z.object({
  userId: z.number(),
  username: z.string().trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(20, 'Password can not be greater than 20 characters'),
  fullName: userNameValidation,
  age: z.number().positive(),
  email: z.string().email().trim(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string().trim()),
  address: addressValidation,
  orders: z.array(orderValidation).optional(),
});

export default userValidation;
