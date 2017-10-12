export default url => {
  let result = '';
  // Remove prefix "exp://"
  result = url.substring(url.indexOf('//') + 2, url.length - 1);
  // Remove port ":19000"
  result = result.substring(0, result.indexOf(':'));

  /**
   * Add 
   * prefix "http://" 
   * port 8080
   * postfix "graphql"
   */
  result = 'http://' + result + ':8080' + '/graphql';
  return result;
};
