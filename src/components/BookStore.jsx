import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import BooksDataService from '../api/BooksDataService'

class BookStore extends Component {
    render(){
        return (
            <div className="container BookStore">
                <HeaderComponent />
                <SearchComponent />
                <Router>
                    <>
                        <Switch>
                            <Route path="/" component={WelcomeComponent} />
                            <Route path="/result" component={SearchResultComponent} />
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
    render(){
        return (
            <div className="container">
                <section class="hero is-dark">
                    <div class="hero-body">
                        <div class="container">
                        <h1 class="title">
                            Search Component
                        </h1>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

class WelcomeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            books: []
        }
    }

    componentDidMount(){
        BooksDataService.searchWithTitle('flowers')
        .then( res => {
            this.setState({
                books: res.data
            })
        })
        .catch( err => console.log(err) )
    }

    render(){
        return (
            <section class="section pl-0 pr-0">
                <div className="container has-text-left is-fluid pl-0 pr-0">
                    <div class="columns is-multiline">
                        {
                            this.state.books.map( book => 
                                <div className="column is-half">   
                                    <CardComponent key={book.isbn} book={book}/>
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
                <article class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                            <img src={this.props.book.url} alt="Image" />
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                            <strong>{this.props.book.title}</strong> <small>{this.props.book.author}</small>
                            <br />
                            {this.props.book.publisher} <br />
                            {this.props.book.publish_date}
                            </p>
                            <button className="button mr-2">More Details</button>
                            <buton className="button is-primary">Buy</buton>
                        </div>
                    </div>
                </article>
                {this.props.book.name}
            </div>
        )
    }
}

class SearchResultComponent extends Component {
    render(){
        return (
            <div className="container">
                SearchResultComponent Component Here
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
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <p class="navbar-item">
                        The BookStore
                    </p>

                    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
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
        <footer class="footer">
            <div class="content has-text-left">
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