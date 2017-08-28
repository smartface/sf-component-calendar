export default function createSpecialDaysService(specialDays){
  specialDays = parseSpecialDays(specialDays);
  
  return {
    getSpecialDay(){
    },
    getAll(){
      return specialDays;
    }
  };
}

function parseSpecialDays(specialDays){
  
  return {
    
  }
}
