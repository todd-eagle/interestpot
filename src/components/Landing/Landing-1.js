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
       // this.renderPage(linkData.data)
        
    }

    parseData = (data) => {

        const categories = data.filter((el, index, arr) => {
            return index === arr.findIndex((element) => (
               element.category === el.category
             ))
        }).map(el => el.category)

        const sectionParsed = this.sectionParse(data, categories, 5)
        this.renderSection(sectionParsed, categories)
    }

    renderSection = (data, arr=[]) => {

        for(let i=0; i<arr.length; i++){
            const renderedData = data.map((el, index) => {            
            return <div key={index} className={"section-card"}>
                <a href={el.link} target="_blank" rel="noopener noreferrer">
                <img src={el.img} alt={el.title}/>
                <h3>{el.title}</h3>
                </a>
            </div>
            })

            this.setState({
                landingPage: renderedData
            })
         }
        
    }

    sectionParse = (data, arr, num=1) => {
        //parses number of articles per section by category
        let n=num
        let parsedData = []
        for(let i=0; i< arr.length; i++){
          for(let j=0; j<data.length; j++){
            if (arr[i] === data[j].category){
                parsedData.push(data[j])
              if(j+1===n){
                n = n+6
                break
              }
            }    
          }
        } 
        return parsedData  
    }
 
    renderHead = (data) => {
       
    }

    renderSections = (data) => {

    }

    render(){
        const {landingPage} = this.state
        return (
            <div className="section-cat">
                {landingPage}
            </div>
        )
    }
}


export default Landing