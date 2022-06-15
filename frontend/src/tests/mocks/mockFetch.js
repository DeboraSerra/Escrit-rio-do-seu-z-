import mockUsers from './mockUsers';
import token from '../../../../backend/services/generateToken';

const user = mockUsers[0];

const notAUser = {
  name: 'Harry Potter',
  email: 'harry.potter@hogwarts.com',
  password: 'Hedwig01!',
}

const mockFetch = (url) => {
  return Promise.resolve({
    json: () => {
      if (url === `http://localhost:3005/user/login?email=${user.email}&password=${user.password}`) {
        return Promise.resolve({ token: token(), user: user.name });
      }
      if (url === `http://localhost:3005/user/login?email=${notAUser.email}&password=${notAUser.password}`) {
        return Promise.resolve({ message: 'wrong email or password' });
      }
    }
  })
}

export default mockFetch;
