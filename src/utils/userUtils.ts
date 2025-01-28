import { validate } from "class-validator";

export async function validateEmail(email: string): Promise<boolean> {
    try {
      const errors = await validate({ email }); 
      return errors.length === 0;
    } catch (error) {
      console.error('Error during validation:', error);
      return false; 
    }
}