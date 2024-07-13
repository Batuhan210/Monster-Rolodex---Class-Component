import {Component} from 'react';
import './search-box.style.css'; 

class SearchBox extends Component {
    render() {
        return (
            <input
                className={`search-box ${this.props.className}`} 
                type="search"                   /* bu kısımda arama kutumuzu gerçek bir arama kutusuna çeviriyor  */
                placeholder={this.props.placeholder}
                onChange= {this.props.onChangeHandler}       /* girdimizde her değişiklik olduğunda çalışan bir geri aramadır. */
            />
        )
    }
}
export default SearchBox;