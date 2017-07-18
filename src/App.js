import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'


import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  handleUpdate = (book,newShelf) => {
    BooksAPI.update(book,newShelf).then(res =>  BooksAPI.getAll().then((books) => {
      this.setState({books})
    }))
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
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
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
