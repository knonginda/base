module.exports = {
  result: [
    {
      firstName: 'Jett',
      test: {
        value: 'test1',
      },
      lastName: 2,
      date: '01/02/2000',
      active: true,
    },
    {
      firstName: 'Test',
      test: {
        value: 'test2',
      },
      lastName: 1,
      date: '01/03/2000',
      active: true,
    },
    {
      firstName: 'Bing',
      test: {
        value: 'test3',
      },
      lastName: 0,
      date: '01/04/2000',
      active: true,
    },
    {
      firstName: null,
      test: {
        value: 'test4',
      },
      lastName: 103,
      date: '05/01/2000',
      active: false,
    },
    {
      firstName: 'Mo',
      test: {
        value: 'test5',
      },
      lastName: null,
      date: '11/03/2001',
      active: true,
    },
    {
      firstName: 'Cahs',
      test: {
        value: null,
      },
      lastName: -5,
      date: '01/01/2000',
      active: false,
    },
  ],
  getData() {
    return this.result
  },
}
