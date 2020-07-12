import React, {Component} from 'react'
import axios from 'axios'
import './Landing.scss'

class Landing extends Component {
    constructor(){
        super()
        this.state = {
            heroArticle: '',
            herosideArticles: '',
            middleArticles: '',
            section: ''
        }
    }

    componentDidMount(){
        this.getData()
    }
    
    getData = async() => {
        const user_id = 1
        const linkData = await axios.get(`/api/articles/${user_id}`) 
        //console.log(linkData)
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
        this.renderSection(data, categories, 8)
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
        const renderedArticles = this.cardFormat(sideArticles, 'main-card')

        this.setState({
            herosideArticles: renderedArticles
        })
    }

    renderMiddleArticles = (data, categories, num) => {
        let randomCategoryIndex =  Math.floor(Math.random() * Math.floor(categories.length)); 
        const articles = this.grabDataByCategory(data, categories[randomCategoryIndex], num, true)
        const renderedArticles = this.cardFormat(articles, 'prominent-card')

        this.setState({
            middleArticles: renderedArticles
        })
    }

    renderSection = (data, categories, num) =>  {
        const sections = []
        
        for(let i=0; i< categories.length; i++){
            let sectionTitle = categories[i].substr(4).toUpperCase()
            const categoryData = this.grabDataByCategory(data, categories[i], num)
            const renderedSection = this.cardFormat(categoryData, 'section-card')
            
            let section = <section className="section-cat">
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
            return <div key={index} className={classname}>
                        <a href={el.link} target="_blank" rel="noopener noreferrer">
                        <img src={el.img} alt={el.title}/>
                        <h3>{el.title}</h3>
                        </a>
                    </div>
        })
       
        return formattedData
    }

    render(){
        const {section, heroArticle, herosideArticles, middleArticles} = this.state
         console.log(this.state)
        return (
            <main class="page-main">   
                <div className="hero-articles"> 
                    {heroArticle}
                    <div class="side-panel-1">
                        {herosideArticles}
                    </div>
                </div>
                <div class="section-main">
                    {middleArticles}
                </div>               
                {section}
            </main>
        )
    }
}


export default Landing