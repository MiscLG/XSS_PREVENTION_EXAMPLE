//Luis Garcia
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.set('views', path.join(__dirname, "views"))
//using path.join is generally safer than interpolation
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine({
  doctype: "<!DOCTYPE html>"
}))
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(path.join(__dirname, 'public')))


const HOST = "localhost"
const MILLISECONDS_IN_A_YEAR = 1000 * 60 * 60 * 24 * 365
const AVG_MILLISECONDS_IN_A_MONTH = MILLISECONDS_IN_A_YEAR / 12
const MAX_STR_LENGTH = 200;

const validate = (condition, message) => {
  if (!condition) {
    throw message
  }
}
class Name {
  constructor(nameString) {
    this._checkValidName(nameString)
    this.name = nameString
  }
  _checkValidName(str) {
    validate(str.length > 0, "This is an empty string")
    //NOTE: validating a name's length may be rude
    //splatting will divide by graphemes and may be more accurate.
    validate([...str].length < MAX_STR_LENGTH, "The string is likely not a name")
  }
  toString() {
    return this.name
  }
}

class Age {
  constructor(numSeconds) {
    //checks that age is not calculated with a negative number of milliseconds(from future date)
    validate(numSeconds >= 0, "Age cannot be calculated with this quantity!")
    this.years = ~~(numSeconds / MILLISECONDS_IN_A_YEAR);
    this.months = ~~((numSeconds % MILLISECONDS_IN_A_YEAR) / AVG_MILLISECONDS_IN_A_MONTH);
  }
  toString() {
    return `${this.years} years and ${this.months} months`
  }

  static calculateAgeFrom(date) {
    //gets present date
    const today = new Date()
    try {
      //fails if date is not in the right format
      const difference = today - new Date(date)
      const userAge = new Age(difference)
      return userAge
    } catch (e) {
      throw "The given DOB is invalid"
    }

  }
}
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'))
})

app.post('/hello', urlencodedParser, (req, res) => {
  age = Age.calculateAgeFrom(req.body.DOB)
  name = new Name(req.body.name)
  //By rendering using express react views, 
  //one can use the react interpolation which automatically prevents code injection
  //example injection attack prevented by templating: <b onclick="alert(1)">LUIS</b> 
  res.render('message', { name: name.toString(), age: age.toString() })
})

app.post('/', (req, res) => {
  console.log("This is a POST request")
  res.send("Posted")
})



let server = app.listen(8081, HOST, () => {
  let host = server.address().address
  let port = server.address().port
  console.log(`Example app listening at http://${host}:${port}`)
})