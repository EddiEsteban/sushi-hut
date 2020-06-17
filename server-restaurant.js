// OBJECTIVE
// Make a restaurant resercation system that:
//  - Accepts user reservations {name, phone, email, id}
//  - Display reservation list
//      - first 5 are 'active reservations'
//      - beyond this are waitingList reservations

// SCOPE
//  - build 3 html pages
//      - landing page with 2 buttons
//      - list of reservations / waitlists
//      - make reservation-form

// WALKTHROUGH for MAKE_RESERVATION
// Go to URL:
// localhost:8080/reserve.html
// Show the form
// Name     [       ]
// Email    [       ]
// Phone    [       ]
// ID       [   ]
//                      [RESERVE]
//
// When user clicks [RESERVE]
//  1. Gathers all the reservation info  into an object
//      { name: ..., email: ..., phone: ...}
//  2. POST that object information to the node SERVER, ex.
//      fetch() '/api/reserve',
//          {method: 'post', headers: {'Content-Type': 'application/json'}})
//  3. Add the '/api/reserve' POST endpoint to your server
//  4. Fix up the logic on the serve to save that reservation to a global list

// WALKTHROUGH for TABLE LISTING
// GO to URL:
// localhost:8080/tables.html
// Shows 2 lists of tables
//  First 5 entries appear in a 'Current Reservations'
//  Any remaining entries appear as 'Waiting List'
// HOW?
// When the page loads, we weant to get the list of tables from the server
// const tableList = fetch('/api/tables').then(result=result.json())
// (hardcode for testing front-end) const tableList = [ {name: ..., email: ..., id: 'table-1'}, {name: ..., email: ..., id: 'table-2}]
// Now with this tableList

const express = require('express')

const app = express()
const PORT = 8080

app.use(express.static('html'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const tableList = [
    { name: "george", email: "george@clooney.com", id: 'table-1' }, 
    { name: "Jeff", email: "jeff@bezos.com", id: 'table-2' } 
]

app.get('/api/tables', function(req, res){
    res.send(tableList)
})

app.post('/api/reserve', function(req, res){
    const newReservation = req.body
    tableList.push(newReservation)

    console.log(tableList)

    res.send({status: true, message: `Cool beans, we saved it for you`})
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  