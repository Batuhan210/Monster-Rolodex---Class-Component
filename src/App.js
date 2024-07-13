import { Component } from "react"; /* reactin bize verdiği bileşen  */
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import "./App.css";

/* Bu bileşenin neyi ve nasıl render etmesini beklediğimizi söylememizi sağlar  */
class App extends Component {
  constructor() {
    /* önce constructor çalışacaktır, sınıflar her zaman önce kurucu işlevi çalıştıracaktır.
Burada, kurucu ile gerçekten yapacağımız tek şey durumu başlatmak.*/
    super();
    this.state = {
      monsters: []      /* canavarlarımızın bir dizesini içeren bir canavar anahtarım var  */,
      searchField: ""   /* tolocalLowerCase olayını bir değişkende saklamalıyız */,
    };
  }

  /* 3. olarakta burası çalışır. Yaşam döngüsü yöntemi bileşeni bağlandı çünkü bileşinimiz az önce bağlandı   */
  componentDidMount() {
    /* Montaj, bir bileşenin DOM'a ilk kez yerleştirilmesidir, bu nedenle react bir bileşeni sayfaya ilk kez işledğinde montaj gerçekleşmiş olur. */
    /* Asenkron */
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {            /* setState çağrıldığı zaman bir kez daha rendering oluyor.  */
          return { monsters: users };
        })
      );
  }

  /* Optimizasyon - Anonim fonksiyondan kurtulduk, anonimken her render olduğunda tekrar ve tekrar çalışacaktı bu da optimizasyon sorununa yol açıyordu, bu şekilde yazonca her render olduğunda bu yöntemi çağırcak */
  onSearchChange = (event) => {
    /* Sınıf bileşinimiz başlatıldığında yalnızca bir kez çağrılacak ve başlatılacak olan yönteme taşıdık.  */

    /* Burada küçük harf duyarlılığı sorununu çözdük */
    const searchField = event.target.value.toLocaleLowerCase(); /* dizedeki her büyük harfi küçük harfe çevirecektir */
      this.setState(() => {
        return {searchField};     /* tek bir değişken kullanıyorsak, Js'in ESX'te yapacağı şey bu değişkenin adı olacak ve değer bu değişkenin değeri olacak diyecektir. */
    });
  };

  render() {     /* 2. olarak burası çalışır, burada bu bileşenin ilk kullanıcı arayüzünü oluşturacak yani bu ilk kullanıcı arayüzünü DOM'a monte edecek. */
    /* obje dağıtma işlemi yaparak optimizasyon yaptık */
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    return (
      <div className="App">
        {/* Canavarları aramak için bir arama kutusu. Ayrıca burayı başka bir dosyada props kullanarak değer verdik */}
        <SearchBox
          className="monsters-search-box"
          onChangeHandler={onSearchChange}
          placeholder={"search monsters"}
        />
        <CardList monsters={filteredMonsters} />
        {/* başlangıçta kart listesine geçirilen boş bir dizidir. */}
      </div>
    );
  }
}
export default App;