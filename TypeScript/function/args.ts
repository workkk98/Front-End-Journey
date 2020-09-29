//function buildName(firstName: string, lastName?: string) {
  function buildName(firstName: string, lastName = 'smith') {
  if (lastName)
      return firstName + " " + lastName;
  else
      return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right


function rest (...rest) {
  return rest;
}