import React,{useState,useEffect} from 'react'
import Axios from "axios";
import "./styles.css";

function Loadmoreproducts() {
    const[loading,setLoading]=useState(false);
    const[productList,setProductList]=useState([]);
    const[count,setCount]=useState(0);
    const[disableButton,setDisableButton]=useState(false);
    const[errorMsg,setErrorMsg]=useState(null);

    async function fetchProducts(){
        try{
            setLoading(true);
            await Axios.get(`https://dummyjson.com/products?limit=10&skip=${count===0? 0: count*20}`)
            .then(res=>{
                setProductList((prevData)=>[...prevData,...res.data.products])
                setLoading(false)
                setErrorMsg(null);
            })
           
        }
        catch (err) {
            if(err.response){
                setErrorMsg(err.response.status)
            }
            
        }
    }
    useEffect(()=>{
        fetchProducts();
    },[count]);
    
    useEffect(()=>{
        if(productList.length===100){
            setDisableButton(true)
        }
    },[productList])
    if(loading){
       return  <div>The page is loading...Please wait</div>
    }
    if(errorMsg!=null){
        return <div>error found{errorMsg}</div>
    }
    
  return (
    <>
       
    
        <div className='container'>
        {
       
       productList?.map((item)=> <div className='product-container' key={item.id}>
           <img className='image' alt={item.title} src={item.thumbnail}/>
           <p>{item.title}</p>
       </div>)
      
       }
        </div>
    
        
      <button disabled={disableButton}
      onClick={()=>setCount(count+1)}>load more products</button>
     
      {
        disableButton?<div>You have reached 100 products</div>:''
      }
      
        
    </>
   
  )
}

export default Loadmoreproducts;
