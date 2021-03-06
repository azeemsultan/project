import http from "./httpService";
const apiEndpoint = process.env.REACT_APP_API_URL+"/api"


export async function getprofile(){
    return await http.get(apiEndpoint+ "/serviceprovider/profile");
}
export async function getacceptedtasks(){

    return await http.get(apiEndpoint + "/serviceprovider/acceptedtasks");
}
export async function getactivetasks(){

    return await http.get(apiEndpoint + "/serviceprovider/activetasks");

}
export async function saveimage(imagestring){
    return await http.post(apiEndpoint+"/serviceprovider/upload",{imagestring});

}export async function editdata(fname,lname,pass,contact,st){

    return await http.post(apiEndpoint+"/serviceprovider/edit",{fname,lname,pass,contact,st});
}