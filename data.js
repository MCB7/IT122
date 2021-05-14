

let humans = [
    {name : "bill", age :30, color:"blue", shape : "circle"},
    {name : "gary", age :40, color:"green", shape : "square"},
    {name : "kevin", age :50, color:"yellow", shape : "triangle"},
    {name : "jose", age :60, color:"orange", shape : "rectangle"},
    {name : "harry", age :70, color:"red", shape : "hexagon"}
]

const getAll = () => {
    return humans
}

//console.log(getAll());
// RETURNS  
//{ name: 'bill', age: 30, color: 'blue', shape: 'circle' },
//{ name: 'gary', age: 40, color: 'green', shape: 'square' },
//{ name: 'kevin', age: 50, color: 'yellow', shape: 'triangle' },
//{ name: 'jose', age: 60, color: 'orange', shape: 'rectangle' },
//{ name: 'harry', age: 70, color: 'red', shape: 'hexagon' }

const getItem = (name) => {
    return humans.find((humans) => {
        return humans.name === name;
    });
}
//http://localhost:3000/details?color=orange
// RETURNS 
//{ name: 'jose', age: 60, color: 'orange', shape: 'rectangle' }


// const addItem = (human)=>{
//     return humans.push(human)
//   }

const addItem = (newHuman) => {
    const oldLength = humans.length;
    let found = getItem(newHuman.name);
    if (!found) {
        humans.push(newHuman);
    }
        return {added: oldLength !== humans.length, total: humans.length };
    };



  //http://localhost:3000/add?name=henry&age=42&color=magenta&shape=orb
  //RETURNS  handlebar formated { name : 'henry' age : '42' color : 'magenta' shape: 'orb'}
    //HOME list shows 
    //bill
    //gary
    //kevin
    //harry
    //henry <-- 
 
// const deleteItem = (name) => {
//     humans = humans.filter((human) => {
//         return human.name !== name;
//     });
// };
//http://localhost:3000/delete?title=jose
//RETURNS - NOT FOUND 
//HOME shows Jose is no longer present in array 

const deleteItem = (name) => {
    const oldLength = humans.length;
    humans = humans.filter((human) => {
        return human.name !== name;
    });
    return {deleted: oldLength !== humans.length, total: humans.length };
};
   
    


export { getAll, getItem, deleteItem, addItem};