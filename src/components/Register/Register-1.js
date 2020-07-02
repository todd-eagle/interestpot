import React, {Component} from 'react'
import axios from 'axios'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            categories: [],
            articles: []
        }
    }

    componentDidMount(){
        this.loadCategories()
    }

    changeHandler = (e) => {
      //  const val =  {[e.target.name]: e.target.value}
        const name = e.target.name
        const isChecked = e.target.checked;
        console.log(isChecked)
        this.setState(prevState => ({ categories: prevState.categories.set(name, isChecked) }));
    }

    async getCategories(){
     try{    
        return await axios.get('/api/category_tables/cat')      
     }catch(err){
        console.log('Error 500: ', err)
     }
    }
    
    async loadCategories(){
      const tableInfo =  await this.getCategories()
      const catTables = tableInfo.data.map((e, current) =>{
         return <div><input type="checkbox" id={e.table_name} name={e.table_name} onChange={e => this.changeHandler(e)} />
                <label>{e.table_name}</label></div>
        })
      this.setState({
        checkboxForm: catTables
      })
    }

    render(){
        const {checkboxForm} = this.state
        console.log(this.state.categories)
        return(
            <>
            <h2>This is the registration page</h2>
            <div>
            {checkboxForm}
            </div>
            </>

        )
    }
}

export default Register;