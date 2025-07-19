
async function getCountryDetails(){
    const req = await fetch(`http://api.weatherapi.com/v1/current.json?key=6efbd54f668440869cd74456251807&q=London&aqi=no`);
    const res = await req.json()
    console.log(res)
    return res;
}