import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate'

const styles = {
    img:{
        width:"80px",
    },
}

const Data = () => {

    const [inputValue, setInputValue] = useState("")

    const [repos, setRepos] = useState([])

    
    
        const handleClick = ( page ) => {
            const pageSelected = page;
            if(repos.length == 0){
                alert("Haz una busqueda primero")
            }else{
                fetch(`https://api.github.com/search/users?q=${inputValue}&page=${pageSelected}`)
                .then(res => res.json())
                .then(data => {setRepos(data.items);})
            }
            
            
        }
       

    useEffect(() => {
        if (!inputValue) {
            return;
        }
        fetch(`https://api.github.com/search/users?q=${inputValue}`)
            .then(res => res.json())
            .then(data => {
                setRepos(data.items);
                console.log(data.total_count)
                const pagination = document.getElementById("pagination")
                //esto permitia traer la biografia las stars y mas caracteristicas, pero no permite por la autenticacion 
                /*data.items.map(x => {
                    fetch(x.url)
                    .then(res => res.json())
                    .then(data => console.log(data.bio))
                })*/
            })
                
        
    
    },[inputValue])
    

    return (
        <div>
            <form onSubmit={event => {event.preventDefault(); setInputValue(event.target.elements.query.value);}}>
                <input type="text" name="query" placeholder="Buscar">
                </input>
            </form>
            <div>
                <ul className="list-group">
                    {repos.map(x => {
                        return  <li className="list-group-item" style={styles.list} key={x.id}>
                                    <img style={styles.img} src={x.avatar_url}/>
                                    <a href={x.html_url}>{x.login}</a>
                                </li>
                    })}
                </ul>
            </div>
            <div id="pagination">
            <ReactPaginate 
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousLabel={'Anterior'}
                nextLabel={'Siguiente'}
                breakLabel={'...'}
                pageCount={25}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                breakClassName={"page-item"}
                nextClassName={"page-item"}
                previousClassName={"page-item"}
                nextLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                onPageChange={handleClick}
            />
             </div>
        </div>
    );
}
export default Data;