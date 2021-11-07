import {useState,useEffect,useRef,useCallback} from 'react';
import User from './User';
import '../App.css';

export default function UserList(){
    const [userList,setUserList]=useState([]);
    const [pageNumber,setpageNumber]=useState(1);
    const [hasMoreData,sethasMoreData]=useState(false);



    
let observer = useRef();
/*use Ref not part of state so doesn't re-render component hence used useCallback*/ 
let lastElementRef=useCallback((element)=>{
    //console.log(element);
    if(observer.current){
        //console.log("observer "+observer);
        observer.current.disconnect(); 
        // this will disconnect last element from previous element so that we can reconnect it 
    }

    observer.current=new IntersectionObserver(entries=>{
        if(entries[0].isIntersecting && hasMoreData){
            //console.log("Visible");
            //since observing single element
            
            setpageNumber((prevPageNumber)=>prevPageNumber+1);
        }

    })

    if(element){
        observer.current.observe(element);
        //this will observe our element
    }

},[hasMoreData])

useEffect(()=>{
   // console.log("Rendering useEffect only during initial render phase");
    document.title="Infinite Scroll";

},[]);

useEffect(()=>{
    console.log("Initial useEffect render");
    fetch(`https://reqres.in/api/users?page=${pageNumber}`)
    .then((response)=>  response.json())
    .then((result)=> {
        
        //console.log(result.data)
        
            sethasMoreData(()=>result.data.length>0) 

            setUserList((prevUserList)=>{
                return  [...prevUserList , ...result.data]
             
            });
        
        
    
    })
    .catch((error)=>console.log(error));
},[pageNumber])


    return (
        <>
            <header>This is sample code for Infinite Scroll without plugin</header>
            <div className="userList-container">
                {userList.map((user,index)=>{
                    if(userList.length===index+1){
                        return (<div  key={user.id} ref={lastElementRef}>
                                <User    user={user}/>
                            </div> )
                    }else{
                        return <User  key={user.id}   user={user}/>
                    }
                    
                   
                })}

                {!hasMoreData && <h3>No More Data to display</h3>}

            </div>
        </>
    )
}