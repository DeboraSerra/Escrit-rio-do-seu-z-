import mockUsers from './mockUsers';
import mockPeople from './mockPeople';
import token from '../../../../backend/services/generateToken';

const person = mockPeople[0];
const user = mockUsers[0];

const notAUser = {
  name: 'Harry Potter',
  email: 'harry.potter@hogwarts.com',
  password: 'Hedwig01!',
}

const mockFetch = (url, obj) => {
  return Promise.resolve({
    json: () => {
      if (url === `http://localhost:3005/user/login?email=${user.email}&password=${user.password}`) {
        return Promise.resolve({ token: token(), user: user.name });
      }
      if (url === `http://localhost:3005/user/login?email=${notAUser.email}&password=${notAUser.password}`) {
        return Promise.reject({ message: 'wrong email or password' });
      }
      if (url === 'http://localhost:3005/user/register' && mockUsers.some((u) => u.email === JSON.parse(obj.body).email)) {
        return Promise.reject({ message: 'User already exists' });
      }
      if (url === 'http://localhost:3005/user/register' && !mockUsers.some((u) => u.email === JSON.parse(obj.body).email)) {
        return Promise.resolve({ message: 'User created' });
      }
      if (url === 'http://localhost:3005/people' && obj.method === 'POST') {
        return Promise.resolve(mockPeople.push(JSON.parse(obj.body)));
      }
      if (url === 'http://localhost:3005/people') {
        return Promise.resolve(mockPeople);
      }
      if (url === `http://localhost:3005/people/${person.id}`) {
        return Promise.resolve(person);
      }
    }
  })
}

export default mockFetch;
