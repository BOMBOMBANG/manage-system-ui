
export const navgation = [
  {
    name: 'test1',
    index: '1',
    icon: 'ios-people',
    children: [
      {
        name: 'test1-1',
        index: '1-1',
        routeName: 'route1',
        icon: 'md-person'
      },
      {
        name: 'test1-2',
        index: '1-2',
        routeName: 'route2',
        icon: 'md-person'
      }
    ]
  },
  {
    name: 'test2',
    index: '2',
    routeName: 'route3',
    icon: 'ios-people'
  }
]

export const getNav = () => {
  return new Promise(function(resolve){
    resolve(navgation)
  })
}
