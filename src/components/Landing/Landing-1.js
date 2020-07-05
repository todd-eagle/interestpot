import React, {Component} from 'react'
import axios from 'axios'

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
        this.renderPage(linkData.data)
        
    }

    renderPage = (data) => {
        
        const rawData = data.map((el, index) => {
           return <div key={index} className={"Box" + index}>
              <a href={el.link} target="_blank" rel="noopener noreferrer">
               <img src={el.img} alt={el.title}/>
               <h3>{el.title}</h3>
               </a>
                     
           </div>
        })
        this.setState({
            landingPage: rawData
        })
    }

    render(){
        const {landingPage} = this.state
        return (
            <div>
                {landingPage}
            </div>
        )
    }
}


export default Landing