import bcrypt, { hash } from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hash('123456', 4, ((err, hash) => {})),
    isAdmin: true,
  },
  {
    name: 'Ivan Ivanov',
    email: 'ivan@example.com',
    password: bcrypt.hash('123456', 4, ((err, hash) => {})),
  },
  {
    name: 'Peter Petrov',
    email: 'petr@example.com',
    password: bcrypt.hash('123456', 4, ((err, hash) => {})),
  },
];

export default users