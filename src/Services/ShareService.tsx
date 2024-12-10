import { Share } from "react-native"

const SharePlace=( place : any)=>{

         Share.share({
             title:'Share Business',
             message:"Business Name: "+place.tags["name"]+"\n"+"Address:" + ( place.tags["addr:city"] ?? place.tags["addr:street"] ),
         })
}



export default{
    SharePlace
}