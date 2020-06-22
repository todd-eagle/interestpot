import React,  {Component} from 'react'
import TravelScraper from '../TravelScraper'


export default class Test extends Component 
{

    componentDidMount(){
        this.callScraper()
    }
    
    callScraper() {
        const t = TravelScraper()
        console.log(t)
    }

    render(){
        return(
            <div></div>
        )
    }

}

