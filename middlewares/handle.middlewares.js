module.exports = (req, res, next)=>{
  res.handleError = (code = '09', msg = '', error = {}) =>{
    return res.status(code).json({
      CODE: code,
      MSG: msg,
      DATA: error
    })
  }

  res.handleSuccess = (data = {}) => {
    return res.json({
      CODE: '00',
      MSG: 'success',
      DATA: data
    })
  }
  
  next()
}