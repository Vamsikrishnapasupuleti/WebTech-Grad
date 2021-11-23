const svg = d3.select('#terms')
              .attr('width', 1600)
              .attr('height', 500)
              

document.addEventListener("DOMContentLoaded", async()=>{

    d3.json('git.json').then((json)=>{

        terms= json.terms
        update(randomizeRatings(terms))
    })
    
})

    
let shuffle = () => {
    //console.log('Hello')
    d3.json('git.json').then((json)=>{

        terms= json.terms
        update(randomizeRatings(terms))
    })
  }   
 

randomizeRatings = (terms) => {
    terms.forEach(d => d.rating = Math.floor(Math.random()*3)+1)
    return d3.shuffle(terms);
}

let update = (terms) =>{

    currentTerms=terms.slice(0,5);
    console.log(currentTerms);

    svg.selectAll("g,circle")
    .data(currentTerms, d => d.name)
    .join(
        enter => {
            //console.log(enter);
            let group = enter.append('g')
            .attr("transform", (d,i) => `translate(${(i+1)*100+(100*i)},150)`);

            group
            .append("circle")
            .attr("r", d => d.rating*30)
            .attr("stroke", "black")
            .attr("fill", "blue")
            .transition().duration(1000)

            group
            .append("text")
            .attr("dx", (d)=> -20)
            .style("fill",'white')
            .text(d=> d.name)
            .transition().duration(1000)
        },
        update => {
            //console.log(update);
            let group = update
            .attr("transform", (d,i) => `translate(${(i+1)*120+(100*i)},300)`);

            group
            .append("circle")
            .attr("r", d => d.rating*25)
            .attr("stroke", "black")
            .attr("fill", "green")
            .transition().duration(1000)

            group
            .append("text")
            .attr("dx", (d)=> -20)
            .style("fill",'white')
            .text(d=> d.name)
            .transition().duration(1000)
        },  
        exit => {
            //console.log(exit);
            exit
            .transition().duration(700)
            .attr("fill", "red")
            .remove() 

        }             
    )
    
}
    // d3.interval(()=>update(randomizeRatings(terms)),4000);
          