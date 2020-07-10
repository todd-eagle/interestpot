import React, {Component} from 'react'
import axios from 'axios'
import './Landing.scss'

class Landing extends Component {
    constructor(){
        super()
        this.state = {
            landingPage: ''
        }
    }

    componentDidMount(){
        this.getData()
    }
    
    getData = async() => {
        const user_id = 1
        const linkData = await axios.get(`/api/articles/${user_id}`) 
        console.log(linkData)
        this.parseData(linkData.data)        
    }

    parseData = (data) => {
        const categories = data.filter((el, index, arr) => {
            return index === arr.findIndex((element) => (
               element.category === el.category
             ))
        }).map(el => el.category)

        this.renderSection(data, categories, 6)
    }

    renderHero = () => {

    }

    HeroFormat = () => {
        
    }

    renderSection = (data, categories, num) =>  {
        const sections = []
        
        for(let i=0; i< categories.length; i++){
            let sectionTitle = categories[i].substr(4).toUpperCase()
            const categoryData = this.grabDataByCategory(data, categories[i], num)
            const renderedSection = this.sectionFormat(categoryData)
            
            let section = <section className="section-cat">
                                <h2>{sectionTitle}</h2>
                                {renderedSection}
                            </section>;
            sections.push(section)      

        }   

        this.setState({
        landingPage: sections
        })

    }    

    grabDataByCategory = (data, category, num) => { 
        let cateforyData = []
        const filterData =  data.filter(el => category === el.category)
        for(let i=0; i < num; i++){
            cateforyData[i+1] = Object.assign(filterData[i])
        }

        return cateforyData
    }

    sectionFormat = (data) => {

        const formattedData = data.map((el, index) => {
            return <div key={index} className={"section-card"}>
                        <a href={el.link} target="_blank" rel="noopener noreferrer">
                        <img src={el.img} alt={el.title}/>
                        <h3>{el.title}</h3>
                        </a>
                    </div>
        })
        return formattedData
    }

    render(){
        const {landingPage} = this.state
        console.log(this.state)
        return (
            <>               
                {landingPage}
            </>
        )
    }
}


export default Landing