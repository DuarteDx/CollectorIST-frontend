import ParserGenerator from './ParserGenerator'

export default ParserGenerator({
  title: {
    required: true,
    type: String
  },
  year: {
    required: true,
    type: Number,
    validator: (value) => {

    }
  }
})
