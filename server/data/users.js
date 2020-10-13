import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Ivan Ivanov',
    email: 'ivan@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Peter Petrov',
    email: 'petr@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users