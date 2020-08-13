import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import BooksDataService from '../api/BooksDataService'

class BookStore extends Component {

    constructor(props){
        super(props)

        this.state = {
            searchTerm: 'The'
        }
    }

    updateSearchTerm = (value) => {
        console.log(value)
        this.setState({
            searchTerm: value
        })
    }

    render(){
        return (
            <div className="container BookStore">
                <HeaderComponent />
                <SearchComponent updateSearchTerm={this.updateSearchTerm} />
                <Router>
                    <>
                        <Switch>
                            <Route path="/" component={ResultsComponent} searchTerm={this.state.searchTerm} />
                            <Route path="/details" component={BookDetailsComponent} />
                            <Route component={ErrorComponent} />
                        </Switch>
                    </>
                </Router>
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
                                    <a className="button is-medium is-primary"
                                        onClick={this.onSearch.bind(this)}>Search</a>
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
        console.log(`ResultsComponent ${this.props.searchTerm}`)
        this.state = {
            searchTerm: "The",
            books: []
        }
    }

    componentDidMount(){
        BooksDataService.searchWithTitle(this.state.searchTerm)
        .then( res => {
            this.setState({
                books: res.data
            })
        })
        .catch( err => console.log(err) )
    }

    render(){
        return (
            <section className="section pl-0 pr-0">
                [{this.props.searchTerm}]
                <div className="container has-text-left is-fluid pl-0 pr-0">
                    <div className="columns is-multiline">
                        {
                            this.state.books.map( book => 
                                <div className="column is-half" key={book.isbn}>
                                    <CardComponent book={book}/>
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
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className="box">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src={this.props.book.url} alt="Image" />
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
                            <a className="button mr-2">More Details</a>
                            <a className="button is-primary">Buy</a>
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
            <div className="container">
                BookDetailsComponent Component Here
            </div>
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

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>
            </nav>
        </header>
    )
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

function ErrorComponent(){
    return (
        <div>
            An Error has Occured. <br/>
            Click here to navigate to <Link to={"/welcome"}>welcome page</Link>
        </div>
    )
}

export default BookStore