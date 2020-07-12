import React, {Component} from 'react'
import axios from 'axios'
import './Register.scss'

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
            data.push({user_id:1, category:key, sub_category:''})
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
        await axios.post(`/api/category-data/1`, catData)
        // this.props.history.push('/landing');
    }

    render(){
        return(
            <>
            <h2>This is the registration page</h2>
            <div className="categories">
                <input type="checkbox" id="cat_movies" name="cat_movies" onChange={e => this.changeHandler(e)}/>
                <label>Movies</label>
                <input type="checkbox" id="cat_travel" name="cat_travel" onChange={e => this.changeHandler(e)}/>
                <label>Travel</label>
                <input type="checkbox" id="cat_health" name="cat_health" onChange={e => this.changeHandler(e)}/>
                <label>Health/Fitnes</label>
                <input type="checkbox" id="cat_food" name="cat_food" onChange={e => this.changeHandler(e)}/>
                <label>Food</label>
                <input type="checkbox" id="cat_gaming" name="cat_gaming" onChange={e => this.changeHandler(e)}/>
                <label>Gaming</label>
                <input type="checkbox" id="cat_dyi" name="cat_dyi" onChange={e => this.changeHandler(e)}/>
                <label>DYI</label>
            </div>
            <button onClick={e => this.dataGenerator(e)}>Lets Go!</button>
            </>

        )
    }
}

export default Register;