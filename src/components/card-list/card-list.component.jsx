import { Component } from "react";
import './card-list.style.css';

class CardList extends Component {
    render() {
        const { monsters } = this.props;          /* bu yapıyı oluşturmamızın nedeni, bunu birden fazla yerde kullanmamız gerekirse bunu yapmanın kolay yolu.*/
        return (
            <div className="card-list">
            {monsters.map((monster) => {
                const { name, email, id } = monster;
                
            return (
                <div className="card-container" key={id} >
                <img alt={`monster ${name}`} src={`https://robohash.org/${id}?set=set2&size=180x180`}  />
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
            )})} 
        </div>
        );
    }
}
export default CardList