export interface AuthUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

export const DEMO_USERS: AuthUser[] = [
  {
    id: "user-1",
    email: "adarsh@agaraassociates.com",
    password: "agara2026",
    name: "Adarsh P",
    role: "Principal Architect",
  },
];

export function findUserByCredentials(email: string, password: string): AuthUser | undefined {
  return DEMO_USERS.find(
    (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password,
  );
}
