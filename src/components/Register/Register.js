import React, {Component} from 'react'
import {connect} from 'react-redux';
import axios from 'axios'
import './Register.scss'
import travel from '../../img/travel.jpg'
import food from '../../img/food.jpg'
import movies from '../../img/movies.jpg'
import gaming from '../../img/gaming.jpg'
import dyi from '../../img/dyi.jpg'
import health from '../../img/health.jpg'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            categories: new Map(),
            articles: [],
        }
    }

    changeHandler = (e) => {
        // const val =  {[e.target.name]: e.target.value}
        const name = e.target.name
        const isChecked = e.target.checked;
       // console.log(isChecked)
        this.setState(prevState => ({ categories: prevState.categories.set(name, isChecked) }));
    }
    
    dataGenerator = async (e) => {
       e.preventDefault()
       const cats = this.state.categories

       for (let [key, value] of cats.entries()) {
        let data = []
        if(value===true){
            data.push({user_id:this.props.user.id, category:key, sub_category:''})
            await this.scrapeData(key)
        }
        // console.log(data)
         await axios.post('/api/categories/', data)  
      }
        this.props.history.push('/landing');
    }

    scrapeData = async (categoryInfo) =>{
        // console.log("CategoryInfo",categoryInfo)
         const catData = await axios.get(`/api/category-data/${categoryInfo}`)
         await this.insertScrapedData(catData,categoryInfo)
    }

    insertScrapedData = async (catData, categoryInfo) => {
        catData = {...catData, category: categoryInfo}
       //  console.log(catData)
        await axios.post(`/api/category-data/${this.props.user.id}`, catData)
        // this.props.history.push('/landing');
    }

    render(){
        return(
            <>
            <main className="page-main"> 
                <h2>Select your Interest</h2>
                <div className="all-categories">
                    <div className="category-card">
                        <input type="checkbox" id="cat_movies" name="cat_movies" onChange={e => this.changeHandler(e)}/>
                        <label for="cat_movies"><img className="checkbox" src={movies} alt="Movies" /></label>
                        <h3>MOVIES</h3>
                    </div>
                    <div className="category-card">
                        <input type="checkbox" id="cat_travel" name="cat_travel" onChange={e => this.changeHandler(e)}/>
                        <label for="cat_travel"><img className="checkbox" src={travel} alt="Travel" /></label>
                        <h3>TRAVEL</h3>
                    </div>
                    <div className="category-card">
                        <input type="checkbox" id="cat_health" name="cat_health" onChange={e => this.changeHandler(e)}/>
                        <label for="cat_health"><img className="checkbox" src={health} alt="Food"/></label>
                        <h3>HEALTH</h3>
                    </div>
                    <div className="category-card">
                        <input type="checkbox" id="cat_food" name="cat_food" onChange={e => this.changeHandler(e)}/>
                        <label for="cat_food"><img className="checkbox" src={food} alt="Food"/></label>
                        <h3>FOOD</h3>
                    </div>
                    <div className="category-card">
                        <input type="checkbox" id="cat_gaming" name="cat_gaming" onChange={e => this.changeHandler(e)}/>
                        <label for="cat_gaming"><img className="checkbox" src={gaming} alt="Gaming"/></label>
                        <h3>GAMING</h3>
                    </div>
                    <div className="category-card">
                        <input type="checkbox" id="cat_dyi" name="cat_dyi" onChange={e => this.changeHandler(e)}/>
                        <label for="cat_dyi"><img className="checkbox" src={dyi} alt="DYI"/></label>
                        <h3>DYI</h3>
                    </div>
                </div>    
                <button onClick={e => this.dataGenerator(e)}>Lets Go!</button>
            </main>
            </>

        )
    }
}

const mapStateToProps =  reduxState => reduxState
export default connect(mapStateToProps)(Register)