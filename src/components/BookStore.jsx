import React, {Component} from 'react'
import BooksDataService from '../api/BooksDataService'

class BookStore extends Component {

    constructor(props){
        super(props)

        this.state = {
            searchTerm: '',
            screen: "empty",
            selectedBook: null
        }
    }

    updateSearchTerm = (value) => {
        // Do Search in the parent component
        if(value !== ""){
            // Rest API Call here
            BooksDataService.searchWithTitle(value)
            .then( res => {
                this.setState({
                    searchTerm: value,
                    books: res.data,
                    selectedBook: null,
                    screen: "results"
                })
            })
            .catch( err => {
                console.log(err)
                this.setState({
                    searchTerm: value,
                    screen: "error"
                })
            } )
        }
    }

    showBookDetails = (bookData) => {
        this.setState({
            selectedBook: bookData,
            screen: "details"
        })
    }

    render(){
        return (
            <div className="container BookStore">
                <HeaderComponent />
                <SearchComponent updateSearchTerm={this.updateSearchTerm} />
                
                {this.state.screen === "results" 
                        && <ResultsComponent result={this.state.books} 
                                searchTerm={this.state.searchTerm}
                                showBookDetails={this.showBookDetails}/>}
                {this.state.screen === "details" && <BookDetailsComponent selectedBook={this.state.selectedBook} />}
                {this.state.screen === "error" && <ErrorComponent searchTerm={this.state.searchTerm} />}
                
                <FooterComponent />
            </div>
        )
    }
}


class SearchComponent extends Component {
    constructor(){
        super()

        this.state = {
            searchTerm: ''
        }
    }

    onSearch = (e) => {
        console.log( `Search for ${this.state.searchTerm}`)
        this.props.updateSearchTerm(`${this.state.searchTerm}`)
    }

    handleSearchTerm = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    render(){
        return (
            <div className="container">
                <section className="hero is-dark">
                    <div className="hero-body">
                        <div className="container">
                            <div className="field is-grouped">
                                <div className="control has-icons-left is-expanded">
                                    <input type="text" className="input is-medium is-flat"
                                        placeholder="Search by book title"
                                        onChange={this.handleSearchTerm.bind(this)}/>
                                </div>
                                <div className="control">
                                    <button className="button is-medium is-primary"
                                        onClick={this.onSearch.bind(this)}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

class ResultsComponent extends Component {
    constructor(props){
        super(props)
        console.log(`ResultsComponent ctor ${this.props.searchTerm}`)
        this.state = {
            searchTerm: this.props.searchTerm,
            books: this.props.result
        }
    }

    static getDerivedStateFromProps(props, state){
        console.log(`ResultsComponent ${props.searchTerm}`)
        if(props.searchTerm !== state.searchTerm){
            return {
                searchTerm: props.searchTerm,
                books: props.result
            }
        }
        return null
    }

    render(){
        return (
            <section className="section pl-0 pr-0">
                <div className="container has-text-left is-fluid pl-0 pr-0">
                    <div className="columns is-multiline">
                        {
                            this.state.books.map( book => 
                                <div className="column is-half" key={book.isbn}>
                                    <CardComponent book={book} showBookDetails={this.props.showBookDetails}/>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        )
    }
}

class CardComponent extends Component {
    render(){
        return (
            <div className="box">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src={this.props.book.url} alt={this.props.book.title} />
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <p>
                            <strong>{this.props.book.title}</strong> <small>{this.props.book.author}</small>
                            <br />
                            {this.props.book.publisher} <br />
                            {this.props.book.publish_date}
                            </p>
                            <button className="button mr-2" onClick={(event) => this.props.showBookDetails(this.props.book)}>More Details</button>
                            <button className="button is-primary">Buy</button>
                        </div>
                    </div>
                </article>
                {this.props.book.name}
            </div>
        )
    }
}


class BookDetailsComponent extends Component {
    render(){
        return (
            <section className="section">
                <div className="container">
                <article className="media">
                    <figure className="media-left">
                        <p className="image is-64x64">
                            <img src={this.props.selectedBook.url} alt={this.props.selectedBook.title} />
                        </p>
                    </figure>
                    <div className="media-content">
                        <div className="content has-text-left">
                            <p>
                                <strong>{this.props.selectedBook.title}</strong> <br />
                                <small>By {this.props.selectedBook.author}</small><br />
                                <small>ISBN: {this.props.selectedBook.isbn}</small><br />
                                Publisher: {this.props.selectedBook.publisher} <br />
                                Date of Publication: {this.props.selectedBook.publish_date} <br />
                                Number of Pages: {this.props.selectedBook.numOfPages}
                            </p>
                        </div>
                    </div>
                    </article>
                </div>
            </section>
        )
    }
}

function HeaderComponent() {
    return (
        <header>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <p className="navbar-item">
                        The BookStore
                    </p>

                    <button className="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </button>
                </div>
            </nav>
        </header>
    )
}

class ErrorComponent extends Component {
    render(){
        return (
            <section className="section">
                <div className="container">
                    <div className="content has-text-left has-text-danger">
                        <p>
                            No results for "{this.props.searchTerm}"
                        </p>
                    </div>
                </div>
            </section>
        )
    }
}

function FooterComponent() {
    return (
        <footer className="footer">
            <div className="content has-text-left">
                <p>
                    &copy; 2020 BookStore Application.
                </p>
            </div>
        </footer>
    )
}

export default BookStore