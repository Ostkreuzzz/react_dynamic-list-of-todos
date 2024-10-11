import { getData } from '../utils/httpClient';
import { User } from '../types/User';

export function getAllUsers() {
  return getData<User[]>(`/users.json`);
}

export function getUser(id: number) {
  return getData<User>(`/users/${id}.json`);
}

// export function getUser(id: number) {
//   return getAllUsers().then(users => users.filter(user => user.id === id));
// }
