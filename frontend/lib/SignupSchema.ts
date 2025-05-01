import { z, ZodType } from "zod";

type Signup = {
  email: string;
  password: string;
  confirmPassword: string;
};

interface ProfileDetails {
  firstName: string;
  lastName: string;
  displayName: string;
  image: string;
  birthDate: Date;
}

interface ProfileDetailsLarge {
  firstName: string;
  lastName: string;
  displayName: string;
}

interface ProfileDetailsImageAndBirthdate {
  image: string;
  birthDate: Date;
}

interface Gender {
  gender: "female" | "male" | "other";
}

interface Interests {
  interests: string[];
}

export const SignupSchema: ZodType<Signup> = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        }
      )
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export const ProfileDetailsSchema: ZodType<ProfileDetails> = z.object({
  firstName: z
    .string()
    .min(3, { message: "Name has to be at least three letter long" })
    .regex(/^[a-zA-Z]+$/, { message: "Name can only contain letters" }),
  lastName: z
    .string()
    .min(3, { message: "Name has to be at least three letter long" })
    .regex(/^[a-zA-Z]+$/, { message: "Name can only contain letters" }),
  displayName: z
    .string()
    .min(3, { message: "Display name has to be at least three letter long" }),
  image: z.string().min(100, { message: "image is required" }),
  birthDate: z
    .date()
    .refine(
      (date) => {
        const now = new Date();
        const eighteenYearsAgo = new Date(
          now.setFullYear(now.getFullYear() - 18)
        );
        return date < eighteenYearsAgo;
      },
      { message: "You must be at least 18 years old" }
    )
    .refine(
      (date) => {
        const now = new Date();
        const eighteeYearsAgo = new Date(
          now.setFullYear(now.getFullYear() - 80)
        );
        return date > eighteeYearsAgo;
      },
      { message: "Either you're too old,or you're lying about your age" }
    ),
});

export const ProfileDetailsLargeSchema: ZodType<ProfileDetailsLarge> = z.object(
  {
    firstName: z
      .string()
      .min(3, { message: "Name has to be at least three letter long" })
      .regex(/^[a-zA-Z]+$/, { message: "Name can only contain letters" }),
    lastName: z
      .string()
      .min(3, { message: "Name has to be at least three letter long" })
      .regex(/^[a-zA-Z]+$/, { message: "Name can only contain letters" }),
    displayName: z
      .string()
      .min(3, { message: "Display name has to be at least three letter long" }),
  }
);

export const ProfileDetailsImageAndBirthdateSchema: ZodType<ProfileDetailsImageAndBirthdate> =
  z.object({
    image: z.string().min(100, { message: "image is required" }),
    birthDate: z
      .date()
      .refine(
        (date) => {
          const now = new Date();
          const eighteenYearsAgo = new Date(
            now.setFullYear(now.getFullYear() - 18)
          );
          return date < eighteenYearsAgo;
        },
        { message: "You must be at least 18 years old" }
      )
      .refine(
        (date) => {
          const now = new Date();
          const eighteeYearsAgo = new Date(
            now.setFullYear(now.getFullYear() - 80)
          );
          return date > eighteeYearsAgo;
        },
        { message: "Either you're too old,or you're lying about your age" }
      ),
  });

export const GenderSchema: ZodType<Gender> = z.object({
  gender: z.enum(["female", "male", "other"], {
    message: "Please Choose your gender, if not listed, choose other",
  }),
});

export const InterestsSchema: ZodType<Interests> = z.object({
  interests: z
    .array(z.string())
    .max(5, { message: "You can't pick more than five interests" }),
});
