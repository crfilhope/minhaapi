module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert(
    'users',
    [
      {
      name: 'Cassiano',
      email: 'cassiano@gmail.com',
      password_hash: '123456',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Cassiano2',
      email: 'cassiano2@gmail.com',
      password_hash: '123456',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Cassiano3',
      email: 'cassiano3@gmail.com',
      password_hash: '123456',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
  {},
),

  down: () => {}, 
  
};
