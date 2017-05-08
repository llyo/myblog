export default function(val) {
  const reg=/^[a-z0-9](\w|\.|-)*@([a-z0-9]+-?[a-z0-9]+\.){1,3}[a-z]{2,4}$/; 
  return reg.test(val);
}