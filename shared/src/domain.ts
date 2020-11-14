export type Brand<T, TBrand> = T & { __brand: TBrand };

export type Hashed = Brand<string, "hashed">;
export type ID = Brand<string, "id">;
export type JWT = Brand<string, "jwt">;

export type User = {
  id: ID;
  email: string;
};

export type DBUser = User & {
  password: Hashed;
};
