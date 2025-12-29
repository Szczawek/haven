import {Link} from "react-router";
import {useState} from "react";
import {addItem} from "./addItem.js";

const stdData = {
    name:"",
    price:0,
    amount:1
}
const stdLoading = {
    loading:false,
    error:false
}

export default function AddItemForm() {
    const [data, setData] = useState(stdData);
    const [loading, setLoading] = useState(stdData);

    function refresh(name,bool) {
        setLoading(prev =>({...prev, [name]:bool}));
    }

    function rewrite(e) {
        const {name,value} = e.target;
        setData(prev => ({...prev,[name]:value}));
    }
    function disable(e) {
        const forbidden = ["e",".","-",",","+"];
        if(forbidden.includes(e.key)) e.preventDefault();
    }
    function enchancedDisable(e) {
        if(data.price == "") disable(e);
    }
    function def(e) {
        const {name, value} = e.target; 
        if(value == "") setData(prev => ({...prev, [name]: name == "price"? 0 : 1}));
    }
    async function submit(e) {
        try {
            e.preventDefault();    
            
            //temporary
            //temporary
            const data = {...data};
            if(data.price < 1 && data.price > 0) data.price = 1;
            refresh("loading",true);
        } catch(err) {
            refresh("error",true);
        } finally {
            refresh("loading",false);
        }
    }

    return <div className="add-item-form">
            <header>
                <h2>Add item to shop</h2>
                <p>Click bellow for:</p>
                <Link to="../shop">Go Back to shop</Link>
            </header>
            <form onSubmit={submit} className="add-item">
                <label htmlFor="inp-image">
                    Image
                    <input id="inp-image" type="file" placeholder="image of product" required />
                </label>
                <label htmlFor="inp-name"> 
                    Name
                    <input id="inp-name" value={data.name} onChange={rewrite} name="name" minLength="1" maxLength="100" required placholder="name"/>
                </label>
                <label htmlFor="inp-p">
                    Price
                    <input id="inp-price" value={data.price} onKeyDown={enchancedDisable} onChange={rewrite} autoComplete="off" onBlur={def} type="number" min="0" max="1000000000" name="price" placeholder="price" required/>
                </label>
                <label htmlFor="inp-amount">
                    Amount
                    <input id="inp-amount" onChange={rewrite} onKeyDown={disable} autoComplete="off" onBlur={def} value={data.amount} min="1" max="1000000" type="number" name="amount" placeholder="amount" required/>
                </label>
                <button className="sb" type="submit">Submit</button>
            </form>
        </div>
}

