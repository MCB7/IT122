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

const getItem = (color) => {
    return humans.find((humans) => {
        return humans.color === color;
    });
}

//console.log(getItem("orange"));
// RETURNS 
//{ name: 'jose', age: 60, color: 'orange', shape: 'rectangle' }

export { getAll, getItem  };