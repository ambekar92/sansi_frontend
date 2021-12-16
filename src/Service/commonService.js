import Configuration from './configuration';
import menuData from '../Service/menuData.json'

class ItemService {

    constructor() {    
        this.config = new Configuration();

        this.items = [    
            {link:1, name:"test1", summary:"Summary Test 1", year:"2001", country:"us", price:"1000", description:"Desc 1"},    
            {link:2, name:"test2", summary:"Summary Test 2", year:"2002", country:"uk", price:"2000", description:"Desc 2"},    
            {link:3, name:"test3", summary:"Summary Test 3", year:"2003", country:"cz", price:"3000", description:"Desc 3"},    
        ];          
    }

    handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }       
    handleError(error) {
        console.log(error.message);
    }

    // Actual Function starts from here

    //Get all data
    async retrieveItems() {           
        let url_a = "api/getUsers"; 
        return await this.getMethod(url_a);
    }    

    //Get Menu List    
    async getMenuList() {           
        //let url_a = "api/getUsers"; 
        // return await this.getMethod(url_a);
        return menuData.menu;
    }   

    async getItem(itemLink) {  
        for(var i = 0; i < this.items.length; i++) {    
            if ( this.items[i].link === itemLink) {    
            return Promise.resolve(this.items[i]);    
            }    
        }    
        return null;    
    }
    
    
    
    // GET Method
    async getMethod(url){
        let api_url= this.config.BASE_URL + url;
        console.log("URL -->", api_url);

        return fetch(api_url,{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
            }).then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            }).then(items => {
                return items;
            }).catch(error => {
                this.handleError(error);
            });
    }

    // POST Method
    async postMethod(url,param){

        let api_url= this.config.BASE_URL + url;
        console.log("URL -->", api_url);

        return fetch(api_url,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body:JSON.stringify(param)
            }).then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            }).then(items => {
                // console.log("Retrieved items:");
                // console.log(json);
                // const items = [];
                // items.push(json);
                // const itemArray = json._embedded.collectionItems;
                // for(var i = 0; i < itemArray.length; i++) {
                // itemArray[i]["link"] =  itemArray[i]._links.self.href;
                // items.push(itemArray[i]);
                // }
                return items;
            }).catch(error => {
                this.handleError(error);
            });
    }
    
}
    
export default ItemService;