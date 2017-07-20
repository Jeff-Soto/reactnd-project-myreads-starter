import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    handleUpdate: PropTypes.func.isRequired
  }

  handleUpdate(book, shelf) {
      this.props.handleUpdate(book,shelf)
    }

  render(){
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.books.map(book =>
            <li key={book.title}>
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
          )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
