module.exports = (date) => {
  let dateObj = new Date(date)
  let r = Math.floor(Math.random() * 100) + 1;

  switch(dateObj.getMonth()){

    case 11:
    case 0:
    case 1:
      if(r>=60)
        return "קר מאוד"
      else if(r<60 && r>=50)
        return "נעים"
      else    
        return "קר"
      
    case 2:    
    case 3:    
    case 4:
      if(r>=70)
        return "חם"
      else if(r<70 && r>=50)
        return "קר"
      else    
        return "נעים"
    case 5:        
    case 6:        
    case 7:        
      if(r>=60)
        return "חם מאוד"
      else if(r<60 && r>=50)
        return "נעים"
      else    
        return "חם"
    

    case 8:
    case 9:
    case 10:
      if(r>=70)
        return "קר"
      else if(r<70 && r>=50)
        return "חם"
      else    
        return "נעים"
 
    
    default:
      break;
  }
}
