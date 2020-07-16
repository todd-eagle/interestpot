import React, {Component} from 'react'
import {connect} from 'react-redux';
import axios from 'axios'
import './Dashboard.scss'
import travel from '../../img/travel.jpg'
import food from '../../img/food.jpg'
import movies from '../../img/movies.jpg'
import gaming from '../../img/gaming.jpg'
import dyi from '../../img/dyi.jpg'
import health from '../../img/health.jpg'
import photography from '../../img/photography.jpg'
import ConfirmWindow from './ConfirmWindow/ConfirmWindow'


class Dashboard extends Component {

    constructor() {
        super()
        this.state = {
            allCategories: '',
            userFormattedCategories: '',
            userCategories:'',
            openedWindow: false,
            user_id: '',
            category: '',
            categories:''
        }
    }

    componentDidMount(){
        this.loadUserCategories()
        this.loadAllCategories()
    }

    loadUserCategories = async() => {
        const categories = await axios('/api/categories/1')
       // console.log("Loading user categories.... ", categories.data)
        this.setState({
            userCategories: categories.data
        })
        this.renderUserCategories(categories.data)
    }


    loadAllCategories = async() => {
        const allCategories = await axios('/api/category_tables/cat')  
        
        const categories = this.state.userCategories.filter((el, index, arr) => {
            return index === arr.findIndex((element) => (
               element.category === el.category
             ))
        }).map(el => el.category)

        // console.log(categories)
        
        const filtered = allCategories.data.filter(el =>{
            return !categories.includes(el.table_name)
        }) 
        // console.log("filtered: ", filtered)
       
        this.setState({
            categories: filtered
        })
    
        //this.renderAllCategories()
        this.renderCategories()
    }

    async renderCategories(){
        let catSelections = {travel, movies, food, gaming, health, dyi, photography}
        let cat
        const tableInfo = this.state.categories
        const catTables = tableInfo.map((el) =>{
            !el.table_name ? cat = el.category : cat = el.table_name
            let key = cat.substr(4).toLowerCase()     
                return <div key={this.randomize(200000)} onClick={()=>this.dataGenerator(el.table_name)}  className="category-card" >
                                <img className="cat-img" src={catSelections[key]} alt={cat.substr(4).toUpperCase()} />
                                <h3>{cat.substr(4).toUpperCase()}</h3>
                        </div>
        })
        this.setState({
          checkboxForm: catTables
        })
    }

    renderUserCategories = (categories) => {
       
        //console.log("userCategories: ", categories)
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
        //console.log(categories.length)
        if(categories.length > 0){
            let cat    
            let remove = categories[0].category ? <div className="remove">Remove</div> : null
            let catSelections = {travel, movies, food, gaming, health, dyi, photography}
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
        //console.log("user_id: ", user_id)
        await axios.delete(`/api/links/${user_id}/${category}`)
        const filteredCategories = this.state.userCategories.filter(el=> el.category !== category)
        this.setState({
            userCategories: filteredCategories
        })
        this.loadUserCategories()
        this.loadAllCategories()
    }

    windowToggle = () => {
        this.setState ({openedWindow:!this.state.openedWindow})
    }

    dataGenerator = async (category) => {
      const data = {user_id:1, category:category, sub_category:''}
       await this.scrapeData(category)

        //console.log(data)
         await axios.post('/api/categories/', data)  
         this.loadUserCategories()
         this.loadAllCategories()
     }
 
     scrapeData = async (categoryInfo) =>{
         // console.log("CategoryInfo",categoryInfo)
          const catData = await axios.get(`/api/category-data/${categoryInfo}`)
          await this.insertScrapedData(catData,categoryInfo)
     }
 
     insertScrapedData = async (catData, categoryInfo) => {
         catData = {...catData, category: categoryInfo}
        //  console.log(catData)
         await axios.post(`/api/category-data/1`, catData)
        // console.log("addedCategory", addedCategory)
     } 

    render(){

        const {allFormattedCategories, userFormattedCategories, user_id, category, checkboxForm} = this.state
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
                <h2>Other Interests</h2> 
                    {allFormattedCategories}
                    {checkboxForm}
                </section>     
            </main>
           
        </>
        )
    }
}
const mapStateToProps =  reduxState => reduxState
export default connect(mapStateToProps)(Dashboard)