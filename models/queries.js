const db = require('./connection')
// let db = connection.db;

 
// conditions = [
//     {column : 'ID', operator : '==', value : 123},
//     {column : 'NAME', operator : 'LIKE', value : '%ABC%'}
// ]


function filter(conditions){
    let query = 'SELECT * FROM USER';
    let values = []
    if(conditions && conditions.length > 0){
        query += ' WHERE ';
        conditions.forEach((condition, index) => {
            if(index > 0){
                query += ' AND ';
            }
            query += `${condition.column} ${condition.operator} ?`;
            values.push(condition.value);
        });
        console.log(values)
    }
    /*For the given conditions the query will be
    SELECT * FROM ENTRIES WHERE ProductName LIKE ? AND PaymentStatus LIKE ?; 
    
    here question mark are place holder whose value will be inserted by .all query in the upcoming lines
    */
    console.log(query)
    const stmt = db.prepare(query);
    const result = stmt.all(values);
    console.log(result)
    return result;
}


module.exports=filter;