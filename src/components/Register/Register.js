import React, {Component} from 'react'
import axios from 'axios'

class Register extends Component {
    constructor(){
        super()
        this.state = {
            categories: [],
            articles: [],
            checkboxForm: []
        }
    }

    componentDidMount(){
        this.loadCategories()
    }

    changeHandler = (e) => {
        let currentCategories = this.state.categories
        let checked = e.target.checked
        let category = e.target.value
        if(checked){
            this.setState({
                categories: [this.state.categories, category]
            })
        }else{
            let index = currentCategories.indexOf(category)
            if(index > -1){
                currentCategories.splice(index, 1)
                this.setState({
                    categories: currentCategories
                })
            }
        }
        

        // // console.log(this.state.categories)
        // console.log(e.target.checked)
        // const val =  {[e.target.name]: e.target.value}
        // currentCategories.push(val)
        // // console.log(currentCategories)
        // this.setState({
        //    categories: currentCategories
        // })
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
         return <div><input type="checkbox" id={e.table_name} name={e.table_name} value={current}  onChange={e => this.changeHandler(e)} />
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