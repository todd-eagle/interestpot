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

        this.sectionsData(data, categories)
    }

    sectionsData = (data, arr) => {
        
    }
 
    renderHead = (data) => {
       
    }


    render(){
        const {landingPage} = this.state
        return (
            <div className="landing-head">
                {landingPage}
            </div>
        )
    }
}


export default Landing