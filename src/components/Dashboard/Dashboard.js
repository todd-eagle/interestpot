import React, {Component} from 'react'
import axios from 'axios'
import travel from '../../img/travel.jpg'
import food from '../../img/food.jpg'
import movies from '../../img/movies.jpg'
import gaming from '../../img/gaming.jpg'
import dyi from '../../img/dyi.jpg'
import health from '../../img/health.jpg'


export default class Dashboard extends Component {

    constructor() {
        super()
        this.state = {
            allCategories: '',
            userFormattedCategories: ''
        }
    }

    componentDidMount(){
       this.loadUserCategories()
        // this.loadAllCategories()
    }

    loadUserCategories = async() => {
        const categories = await axios('/api/categories/1')
       
        this.renderUserCategories(categories.data)

        // this.renderUserCategories()
    }

    loadAllCategories = async() => {
        const allCategories = await axios('/api/category_tables/cat')
        this.setState({
            categories: allCategories.data
        })
    
        this.renderAllCategories()
    }

    renderUserCategories = (categories) => {
       
        console.log("userCategories: ", categories)
        const userFormattedCategories =this.formatCategories(categories)
        this.setState({
            userFormattedCategories: userFormattedCategories
        })
    }

    renderAllCategories = () => {
        const allCategories = this.state.categories
        const allFormattedCategories =this.formatCategories(allCategories)
        this.setState({
            allFormattedCategories: allFormattedCategories
        })
    }

    formatCategories = (categories) => {
        let cat
        let catSelections = {travel, movies, food, gaming, health, dyi};
        const catagoryMap = categories.map(el => {
            !el.table_name ? cat = el.category : cat = el.table_name      
           let key = cat.substr(4).toLowerCase() 
            return (
                <div key={this.randomize(20000)} className="category-card">
                    <div class="remove">Remove</div>
                    <img class="cat-img" src={catSelections[key]} alt={cat.substr(4).toUpperCase()} />
                    <h3>{cat.substr(4).toUpperCase()}</h3>
                </div>
            )
        }) 
        return catagoryMap
    }

    randomize = (num) => {
        let randomIndex =  Math.floor(Math.random() * Math.floor(num))
        return randomIndex
    }

    render(){
        const {allFormattedCategories, userFormattedCategories} = this.state
        return (<> 
            <section className="categories">
                {userFormattedCategories}
                {allFormattedCategories}
            </section>
        </>)
    }
}
