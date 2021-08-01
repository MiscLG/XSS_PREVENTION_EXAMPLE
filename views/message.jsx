var React = require('react')

function HelloMessage(props) {
  //using the braces syntax to render in react prevents code injection by default
  return <div>Hello {props.name}, you are {props.age} old</div>
}

module.exports = HelloMessage