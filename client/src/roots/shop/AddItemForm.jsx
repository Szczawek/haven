import {Link} from "react-router";
export default function AddItemForm() {
        
    async function submit(e) {
        try {
            e.preventDefault();    
        } catch(err) {
        } finally {

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
                    <input id="inp-shop-a" placeholder="iteam amount..." required/>
                </label>
                <button className="sb" type="submit">Submit</button>
            </form>
        </div>
}
