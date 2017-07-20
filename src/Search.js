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
            for (let shelfBook of this.props.books) {
              book.shelf = shelfBook.id === book.id ? shelfBook.shelf : 'none'
              if (book.shelf !== 'none'){
                break
              }
            }
            return book
          })
          this.setState({results: resultsArr})
        }
      }).catch(e => {
        console.log(e)
        this.setState({results: []})
      })
    } else{
      this.setState({results: []})
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
                  {book.imageLinks ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                : <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(https://books.google.com/googlebooks/images/no_cover_thumb.gif)`}}></div>}
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(e) => this.handleUpdate(book, e.target.value)}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors ? <div className="book-authors">{book.authors}</div> : <div className="book-authors">N/A </div>}
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
