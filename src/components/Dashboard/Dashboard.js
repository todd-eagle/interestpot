import React, {Component} from 'react'
import axios from 'axios'
import './Dashboard.scss'
import travel from '../../img/travel.jpg'
import food from '../../img/food.jpg'
import movies from '../../img/movies.jpg'
import gaming from '../../img/gaming.jpg'
import dyi from '../../img/dyi.jpg'
import health from '../../img/health.jpg'
import ConfirmWindow from './ConfirmWindow/ConfirmWindow'


export default class Dashboard extends Component {

    constructor() {
        super()
        this.state = {
            allCategories: '',
            userFormattedCategories: '',
            openedWindow: false,
            user_id: '',
            category: '' 
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
            userFormattedCategories: userFormattedCategories,
            userCategories: categories
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
        console.log(categories.length)
        if(categories.length > 0){
            let cat    
            let remove = categories[0].category ? <div className="remove">Remove</div> : null
            let catSelections = {travel, movies, food, gaming, health, dyi}
            const categoryMap = categories.map(el => {
                !el.table_name ? cat = el.category : cat = el.table_name      
            let key = cat.substr(4).toLowerCase() 
                return (
                    <div key={this.randomize(20000)} className="category-card" 
                    onClick={()=> this.setState({user_id: el.user_id, category: el.category, openedWindow:!this.state.openedWindow})}>
                        {remove}
                        <img className="cat-img" src={catSelections[key]} alt={cat.substr(4).toUpperCase()} />
                        <h3>{cat.substr(4).toUpperCase()}</h3>
                    </div>
                )
            }) 
            return categoryMap
        }
        return <p>Nothing Selected ...</p>
    }

    randomize = (num) => {
        let randomIndex =  Math.floor(Math.random() * Math.floor(num))
        return randomIndex
    }

    remove = async(user_id, category) => {
        console.log("user_id: ", user_id)
        await axios.delete(`/api/links/${user_id}/${category}`)
        const filteredCategories = this.state.userCategories.filter(el=> el.category !== category)
        this.setState({
            userCategories: filteredCategories
        })
        this.loadUserCategories()
    }

    windowToggle = () => {
        this.setState ({openedWindow:!this.state.openedWindow})
    }

    render(){

        const {allFormattedCategories, userFormattedCategories, user_id, category} = this.state
        const confirmedWindow = this.state.openedWindow ? <ConfirmWindow userid={user_id} 
        category={category} toggleFn={this.windowToggle} removeFn={this.remove}/> : null
        return (<> 
         <main className="page-main">
                <section className="categories">
                <h2>Selected Interests</h2> 
                    {confirmedWindow}
                    {userFormattedCategories}
                </section>  
                <section className="other-categories">
                    {allFormattedCategories}
                </section>  
                    
            </main>
           
        </>
        )
    }
}
