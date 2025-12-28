import {Link} from "react-router";
import {useState} from "react";
const stdData = {
    name:"",
    price:"",
    amount:1,
}

const stdLoading = {
    loading:false,
    error:false,
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
    function disabled(e) {
        console.log(e.target.value)
        if(e.target.value.includes(".")) console.log(2);
        rewrite(e);
    }
    async function submit(e) {
        try {
            refresh("loading",true);
            e.preventDefault();    
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
            <form className="add-item">
                <label htmlFor="inp-shop-i">
                    Image
                    <input id="inp-shop-i" type="file" placeholder="image of product" required />
                </label>
                <label> 
                    Name
                    <input required placholder="item name..."/>
                </label>
                <label htmlFor="inp-shop-p">
                    Price
                    <input id="inp-shop-p" placeholder="item price..." required/>
                </label>
                <label>
                    Amount
                    <input id="inp-shop-a" onChange={disabled} autoComplete="off" value={data.amount} min="1" max="1000000" type="number" name="amount" placeholder="iteam amount..." required/>
        i
                </label>
                <button className="sb" type="submit">Submit</button>
            </form>
        </div>
}

