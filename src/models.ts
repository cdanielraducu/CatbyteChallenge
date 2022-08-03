export interface UserApiResponse {
  firstName: string;
  lastName: string;
  address: {address: string};
  age: string;
  image: string;
  state: string;
}

export interface User {
  image: string;
  firstName: string;
  lastName: string;
  age: string;
  address: string;
  state: string;
}
