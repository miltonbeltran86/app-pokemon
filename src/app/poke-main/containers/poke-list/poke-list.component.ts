import { Component, OnInit } from '@angular/core';
import { books } from "../../../books";
import { PokemonsService } from '../../services/pokemons.service';
import { MessagesService } from 'src/app/alerts/services/messages.service';
@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.css']
})
export class PokeListComponent implements OnInit {

  constructor(private pokemonsService: PokemonsService, private msgService: MessagesService) { }
  books : any[] = [];
 ngOnInit() {
   // this.books = books.items;
   this.getProducts();
  }

  addFavorites(book){
    this.pokemonsService.addFavorite(book);
  }

  getProducts(): void {  
      this.pokemonsService.getProducts().subscribe(products => this.buildPokemons(products) );  
      this.msgService.getNamePokemon().subscribe((data:string) =>  this.searchBook(data))
    }

    buildPokemons(pokes){
      let temporalArray: Array<any> = [];
      

      for (let index = 0; index < pokes.results.length; index++) {
        const element = pokes.results[index];
        if(index > 100)
          break;
        this.pokemonsService.getPokemon(element.url).subscribe(poke=>{temporalArray.push(poke);});
      }

      this.books = temporalArray;
    }

    getImage(url: string): string{
      let pokemon;
      
       this.pokemonsService.getPokemon(url).subscribe(poke=>{pokemon = poke.sprites.front_default ; console.log(poke)});

       console.log(pokemon);
       return pokemon;
    }
       searchBook(data:string){
        console.log("entro searchbook")

        return this.pokemonsService.getProduct(data).subscribe(products => this.books = products);  
        //this.search(data);
      }

      search(query: string){
        console.log("entro")
        let book = this.books.find(
          item => {
            return item.volumeInfo.Title === query;
          }
        );
        this.books = [];
        this.books.push(book);
      }

}
