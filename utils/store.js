const tasks = [
    {
        id: 'card1',
        name: 'learning js'
    },
    {
        id: 'card2',
        name: 'codeing js'
    },
    {
        id: 'card3',
        name: 'About react'
    },

]


const data={
    lists:{
        'list1': {
            id: 'list1',
            title: 'Todo',
            tasks
        },
        'list2':{
            id: 'list2',
            title: 'Doing',
            tasks: [
                {
                    id: 'card4',
                    name: 'code trello'
                },
                {
                    id: 'card5',
                    name: 'upload'
                }
            ]
        }
    },
    listsIds: ['list1','list2']
}

export default data