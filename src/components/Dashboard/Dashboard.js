import React, {Component} from 'react'
import axios from 'axios'

export default class Dashboard extends Component {

    constructor() {
        super()
        this.state = {
            allCategories: ''
        }
    }

    componentDidMount(){
        this.loadUserCategories()
        this.loadAllCategories()
    }

    loadUserCategories = async() => {
        const categories = await axios('/api/categories/1')
        this.renderUserCategories(categories)
        this.setState({
            userCategories: categories
        })
    }

    loadAllCategories = async() => {
        const allCategories = await axios('/api/category_tables/cat')
        this.setState({
            categories: allCategories
        })
        this.renderAllCategories()
    }

    renderUserCategories = (categories) => {

    }

    renderAllCategories = () => {
        const allCategories = this.state.categories
        console.log("allCATS = ", allCategories)
    }

    formatCategories = (categories) => {

    }

    render(){
        return (<> 
            <section className="categories">

            </section>
        </>)
    }
}
