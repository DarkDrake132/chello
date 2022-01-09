// THIS PAGE IS JUST FOR TESTING PURPOSE

import {
    getBoard,
    addTask,
    getTask,
    getList,
    renameList,
    addList,
    addDocument,
    moveTask,
} from "../firebase/service";

export default function demoPage() {
    const userId = 'lRQbJkXtyEhjANCTUolfYjiK7oqG';
    const myRoomId = 'wVTohFGXZmZ00uqrdQr5';
    async function clickHandler() {
        // addList('LI01', 'My List 1', myRoomId);
        // addTask('TA01', 'My task 1', 'LI01');
        // addTask('TA02', 'My task 2', 'LI01');
        // addList('LI02', 'My List 2', myRoomId);
        // addTask('TA03', 'My task 3', 'LI02');
        // addTask('TA04', 'My task 4', 'LI02');
        renameList('LI01', 'My List test rename');
        // moveTask('TA03','LI02','LI01')
        
    }

    return (
        <div>
            <h1>THIS PAGE IS JUST A DUMMY PAGE FOR TESTING PURPOSE</h1>
            <button onClick={clickHandler}>CLick here</button>
        </div>
    )
}
