import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Search from './Search'


import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  handleUpdate = (book,newShelf) => {
    BooksAPI.update(book,newShelf).then(() =>  {
      book.shelf = newShelf
      // Filter out book and append it so it appears at the end of new shelf
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }))
    })
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    let currentlyReadingShelf = this.state.books.filter(book => book.shelf === 'currentlyReading')
    let wantToReadShelf = this.state.books.filter(book => book.shelf === 'wantToRead')
    let readShelf = this.state.books.filter(book => book.shelf === 'read')
    return (
      <div className="app">
        <Route path='/search' render={({history}) => (
          <Search
            handleUpdate={this.handleUpdate}
            books={this.state.books}
          />
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  shelfName={"Currently Reading"}
                  handleUpdate={this.handleUpdate}
                  books={currentlyReadingShelf}
                />
                <BookShelf
                  shelfName={"Want To Read"}
                  handleUpdate={this.handleUpdate}
                  books={wantToReadShelf}
                />
                <BookShelf
                  shelfName={"Read"}
                  handleUpdate={this.handleUpdate}
                  books={readShelf}
                />
              </div>
            </div>
            <div className="open-search">
               <Link to="/search">Add a book</Link>
             </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
