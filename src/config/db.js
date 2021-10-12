import mongoose from 'mongoose'
const connect = async () => {
  let uri = process.env.MONGO_URI
  let options = {

  }
  const conn = await mongoose.connect(uri, options)
  console.log(`MongDB Connected: ${conn.connection.host}`.cyan.underline)
}
export default { connect };
