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
        this.parseData(linkData.data)        
    }

    parseData = (data) => {
        const categories = data.filter((el, index, arr) => {
            return index === arr.findIndex((element) => (
               element.category === el.category
             ))
        }).map(el => el.category)

        const sectionParsed = this.sectionParse(data, categories)
        this.renderSection(sectionParsed, categories)
    }

    renderSection = (data, arr) =>  {
        console.log(data)
        const sections = []
        for(let i=0; i < data.length; i++){
            const renderedSection = this.sectionFormat(data[i])
            // const siisy = data[i+1] ? p =renderedSection : p.concat(renderedSection)

            let sectionTitle = arr[i].substr(4).toUpperCase()
            let section = <section className="section-cat">
                                <h2>{sectionTitle}</h2>
                                {renderedSection}
                          </section>;
            sections.push(section)              
            this.setState({
                landingPage: sections
            })
        }
    }

    sectionParse = (data, arr) => {
        const sectionSort = []

        for(let i=0; i < arr.length; i++) {
            const sortedData = data.filter(e => e.category === arr[i])
            sectionSort.push(sortedData)
        }

        return sectionSort
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
        return (
            <>               
                {landingPage}
            </>
        )
    }
}


export default Landing