import React, {Component} from 'react'
import axios from 'axios'

export default class Dashboard extends Component {

    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount(){
        this.loadUserCategories()
        this.loadAllCategories()
    }

    loadUserCategories = async() => {
        const categories = await axios('/api/categories/1')
        this.renderUserCategories(categories)
    }

    loadAllCategories = async() => {
        const allCategories = await axios('/api/category_tables/cat')
        return  allCategories
    }

    renderUserCategories = (categories) => {

    }

    renderAllCategories = (categories) => {

    }

    render(){
        return (<> 
            <section className="categories">

            </section>
        </>)
    }
}
