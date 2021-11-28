// select element with id terms and set the attributes width and height
const svg 
= d3.select('#terms')
              .attr('width', 1600)
              .attr('height', 500)
              
// When page was loaded below statements will be executed 
document.addEventListener("DOMContentLoaded", async()=>{

    d3.json('git.json').then((json)=>{

        terms= json.terms
        update(randomizeRatings(terms))
    })
    
})

    
// method called on click of shuffle button in order to perform d3 operations
let shuffle = () => {
    //console.log('Hello')
    // get git terms from git.jsom using d3
    d3.json('git.json').then((json)=>{

        terms= json.terms
        update(randomizeRatings(terms))
    })
  }   
 

// Randomize the ratings of git terms fetched from git.json file and shuffle the results
randomizeRatings = (terms) => {
    terms.forEach(d => d.rating = Math.floor(Math.random()*3)+1)
    return d3.shuffle(terms);
}

// update method using d3 js which includes join and enter + update + exit
// takes input list of git terms

let update = (terms) =>{

    // from list of terms retrieve the first 5 terms using d3 slice function 
    currentTerms=terms.slice(0,5);
    console.log(currentTerms);

    // below join operation will work based on the 5 elements of currentTerms variable.
    // enter --> While entering it will add a circle and a text inside circle with the radius of rating of term *30 and text with name of the term 
    // update --> When clicked on shuffle button the new 5 terms will get compared with old 5 terms and if any existing terms then wil update the fill color green and translate the location to down 
    // exit --> When there are more than 5 terms when compared to previous terms then those will get removed with transition of 700 and the fill color to red
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
            .on('mouseleave', function() {
                d3.select(this)
                .attr('fill', 'blue')
            })
            .on('mouseover', function() {
                d3.select(this)
                    .attr('fill', '#330000')
            })
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
            .on('mouseleave', function() {
                d3.select(this)
                .attr('fill', 'green')
            })
            .on('mouseover', function() {
                d3.select(this)
                    .attr('fill', '#990066')
            })
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
            //.attr("transform", (d,i) => `translate(${(i+1)*50+(100*i)},150)`)
            .transition().duration(700)
            .style("fill", "red")
            .remove() 

        }             
    )
}
          