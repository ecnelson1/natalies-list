import React, { Component } from 'react';
import { getBooks, bookSearch } from '../api-utils';

export default class BooksPage extends Component {
    state = {
       books:[],
       favorites: [],
       search:''
        }
      componentDidMount = async () => {
          await this.fetchBooks();
      }
      fetchBooks = async () => {
          const books = await getBooks()
          this.setState({ books });
      }
      handleSubmit = async e =>{
        e.preventDefault();
        const books = await bookSearch(this.state.search);
        this.setState({ search: '', books: books })
      }
      handleSearchChange = e => this.setState({ search: e.target.value })

      isAFavorite = (book) => {
          if (!this.props.token) return true;
  
          const isIsFavorites = this.state.favorites.find(favorite => favorite.id === book.id);
  
          return Boolean(isIsFavorites);
      }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.search} onChange={this.handleSearchChange} />
                    <button>Search for movies</button>
                </form>
                <div className="book-list">
                {
                    this.state.books.map((book) => 
                    <div key={`${book.id}`} className="movie">
                        <h3>{book.title}</h3>
                        <p>{book.description}</p>
                        <p>{
                        this.isAFavorite(book) 
                            ? '<3' 
                            :  <button onClick={() => this.handleFavoriteClick(book)}>Add to favorites</button>}
                        </p>
                    </div>)
                }
                </div>
            </div>)
   }
}