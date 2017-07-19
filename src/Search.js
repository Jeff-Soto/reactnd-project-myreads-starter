import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class Search extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    handleUpdate: PropTypes.func.isRequired
  }

  state = {
    results: []
  }

  handleUpdate(book, shelf) {
    this.props.handleUpdate(book,shelf)
  }

  updateQuery = (query) => {
    let resultsArr = []
    if (query){
      BooksAPI.search(query, 20).then((results) => {
        if (results.length > 0) {
          resultsArr = results.map(book => {
            let formattedBook = {title: book.title, id: book.id}
            // check if there are thumbnails and authors
            formattedBook.thumbnail = book.imageLinks ? book.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'
            formattedBook.author = book.authors ? book.authors : 'N/A'
            // check if resulting book matches a book already in shelf
            for (let shelfBook of this.props.books) {
              formattedBook.shelf = shelfBook.id === formattedBook.id ? shelfBook.shelf : 'none'
              if (formattedBook.shelf !== 'none'){
                break
              }
            }
            return formattedBook
          })
          this.setState({results: resultsArr})
        }
      }).catch(e => {
        console.log(e)
        this.setState({results: []})
      })
    }
  }

  shouldComponentUpdate(nextProps,nextState) {
    const differentResults = this.state.results !== nextState.results
    return differentResults
  }

  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
            type="text"
            placeholder="Search by title or author"
            onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((book, index) =>(
              <li key={index}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.thumbnail})`}}></div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(e) => this.handleUpdate({id: book.id}, e.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.author}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
