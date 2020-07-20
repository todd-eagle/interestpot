import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logout} from '../../redux/reducers/AuthReducer';
import {login} from '../../redux/reducers/AuthReducer';
import logo from './../../img/logo.png'
import Footer from '../Footer/Footer'

import './Landing.scss'

class Landing extends Component {
    constructor(props){
        super(props)
        this.state = {
            heroArticle: '',
            herosideArticles: '',
            herosideArticles1: '',
            middleArticles: '',
            section: '',
            isMenuOpen: false
        }
    }

    async componentDidMount (){
        console.log("props",this.props)
        if(!(this.props.isLoggedIn)){ this.props.history.push('/login')}
        const user = await axios.get('/api/auth/session')
        this.props.login(user.data)
        this.getData()
    }

    toggleMenu = () => this.setState({isMenuOpen: !this.state.isMenuOpen})

    getData = async() => {
        const user_id = this.props.user.id
        const linkData = await axios.get(`/api/articles/${user_id}`) 
        this.parseData(linkData.data)        
    }

    parseData = (data) => {
        const categories = data.filter((el, index, arr) => {
            return index === arr.findIndex((element) => (
               element.category === el.category
             ))
        }).map(el => el.category)
        
        this.renderHeroMain(data, categories, 1)
        this.renderHeroSide(data, categories, 2)
        this.renderMiddleArticles(data, categories, 3)
        this.renderSection(data, categories, 12)
    }

    renderMenu = () => {
        const isLoggedIn = this.props.isLoggedIn
        return <nav className="menu">
                  <span className="nav-icon nav-icon__close" onClick={() => this.toggleMenu()}>&nbsp;</span>
                    <div className="menu-box">
                      <Link onClick={e => this.props.logout()} className="menu-item" to='/login'>Logout</Link>
                      <Link className="menu-item" to={isLoggedIn ? '/profile' : '/login'}>Profile</Link>
                      <Link className="menu-item" to={isLoggedIn ? '/dashboard' : '/login'}>Dashboard</Link>
                    </div>    
              </nav>
    }
    
    renderHeroMain = (data, categories, num) => {
       
        let randomCategoryIndex =  Math.floor(Math.random() * Math.floor(categories.length))
        const heroArticle = this.grabDataByCategory(data, categories[randomCategoryIndex], num, true)
         console.log("grabDataByCategory: ", heroArticle)
        const renderedArticle = this.cardFormat(heroArticle, 'main-card-0')

        this.setState({
            heroArticle: renderedArticle
        })

    }

    renderHeroSide = (data, categories, num) => {
        let randomCategoryIndex =  Math.floor(Math.random() * Math.floor(categories.length)); 
        const sideArticles = this.grabDataByCategory(data, categories[randomCategoryIndex], num, true)
        const sideArticles1 = this.grabDataByCategory(data, categories[randomCategoryIndex], num, true)
        const renderedArticles = this.cardFormat(sideArticles, 'main-card')
        const renderedArticles1 = this.cardFormat(sideArticles1, 'main-card')

        this.setState({
            herosideArticles: renderedArticles,
            herosideArticles1: renderedArticles1
        })
    }

    renderMiddleArticles = (data, categories, num) => {
        let randomCategoryIndex =  Math.floor(Math.random() * Math.floor(categories.length)); 
        const articles = this.grabDataByCategory(data, categories[randomCategoryIndex], num, true)
        // const renderedArticles = this.cardFormat(articles, 'prominent-card')
        const FirstRenderedArticles = this.cardFormat(articles, 'prominent-card')
        const FinalRenderArticles = <>
                                        <h2>POPULAR</h2>
                                        {FirstRenderedArticles}
                                    </>
        this.setState({
            middleArticles: FinalRenderArticles
        })
    }

    renderSection = (data, categories, num) =>  {
        const sections = []
        
        for(let i=0; i< categories.length; i++){
            let sectionTitle = categories[i].substr(4).toUpperCase()
            const categoryData = this.grabDataByCategory(data, categories[i], num)
            const renderedSection = this.cardFormat(categoryData, 'section-card')
            
            let section = <section key={this.randomize(333333333)} className="section-cat">
                                <h2>{sectionTitle}</h2>
                                {renderedSection}
                            </section>;
            sections.push(section)      

        }   

        this.setState({
        section: sections
        })
    }    

    grabDataByCategory = (data, category, num, random=false) => { 
        let categoryData = []
        const filterData =  data.filter(el => category === el.category)
         console.log("FlteredData", filterData)
        for(let i=0; i < num; i++){
            if (filterData.length !== 0)
                if (random === true){
                    categoryData[i] = Object.assign(filterData[this.randomize(filterData.length)])
                }else{
                    categoryData[i] = Object.assign(filterData[i])
                }
                // console.log("categoryData: ", categoryData[i])
        }
        // console.log("categoryData Returned: ", categoryData)
        return categoryData
    }

    randomize = (num) => {
        let randomIndex =  Math.floor(Math.random() * Math.floor(num))
        return randomIndex
    }

    cardFormat = (data, classname) => {
        // console.log("cardFormat data ", data)
        const formattedData = data.map((el, index) => {
            return <div key={this.randomize(333333333)} className={classname}>
                        <a href={el.link} target="_blank" rel="noopener noreferrer">
                        <img src={el.img} alt={el.title}/>
                        <h3>{el.title}</h3>
                        </a>
                    </div>
        })
       
        return formattedData
    }

    render(){
        const {section, heroArticle, herosideArticles, herosideArticles1, middleArticles} = this.state
         console.log(this.state)
        return (
            <>
                <div className="header-landing">
                  <Link to="/landing">
                    <div className="title-logo">
                        <img className="logo-home" src={logo} alt="InterestPot" />
                        <div className="title">
                            InterestPot
                        </div>
                    </div>
                    </Link>    
                    <div className="menu-content" onClick={() => this.toggleMenu()}>
                        <span className="nav-icon">&nbsp;</span>
                        {this.state.isMenuOpen ? this.renderMenu() : null}
                    </div>
                </div>  
                <main className="page-main">   
                    <div className="hero-articles"> 
                        {heroArticle}
                        <div className="side-panel-1">
                            {herosideArticles}
                        </div>
                        <div className="side-panel-1">
                            {herosideArticles1}
                        </div>
                    </div>
                    <div className="section-main">
                        {middleArticles}
                    </div>               
                    {section}
                </main>
                <Footer />
            </>
        )
    }
}


const mapStateToProps =  reduxState => reduxState

const mapDispatchToProps = {login, logout}
export default connect(mapStateToProps, mapDispatchToProps)(Landing)