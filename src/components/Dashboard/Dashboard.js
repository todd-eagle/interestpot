import React, {Component} from 'react'
import axios from 'axios'

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
        const catagoryMap = categories.map(el => {
            !el.table_name ? cat = el.category : cat = el.table_name
            return (
                <div key={this.randomize(20000)} className="user-categories">
                    <p>{cat.substr(4).toUpperCase()}</p>
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
