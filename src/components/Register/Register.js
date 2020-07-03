import React, {Component} from 'react'
import axios from 'axios'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            categories: new Map(),
            articles: [],
        }
    }

    componentDidMount(){
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
        }
        console.log(data)
         await axios.post('/api/categories/', data)  
      }
    }

    getCategoryData = (categoryInfo) =>{

    }

    postScrappedInfo = () => {
        
    }


    render(){
        return(
            <>
            <h2>This is the registration page</h2>
            <div>
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