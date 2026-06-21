//window.alert("hello in js");
//console.log("ahmed");
/*
document.getElementById("demo").innerHTML = "web design";

var Ahmed_nigm = " js";

            //--primative--//
// Number 123      0.11    00.12   010111010
//string ==> "nigm "
//bolean ==> false , true
//undefined == var x;
//object ==> Null

          //--non primative--//
//object

var age = 12;
var name = " saied";
var isfound = true;
var x;
var imag = null;

console.log('name');
console.log(name);
console.log(typeof age)

//لو عايز اعرضهم ع سطر واحد 
console.log(name ,typeof age)

//امثله

console.log(name , typeof name);
console.log(age , typeof age);
console.log(isfound, typeof isfound);
console.log(x , typeof x);
console.log(imag, typeof imag);



*/


//----------------------------------
//logical operator
// بيرجعوا ترو و فولس 
//&&
//||
//    !
/*
var a =10;
var b =10;

console.log(a && b == 10);


var c = 5;

var d = 10;
var g = c +d;
console.log( g++); 
*/

//comparesion
/*
var  x = "10";
var y =10;
console.log(x !== y)




var  x = 10;
var y =5;
console.log( x == 59|| y==5) 
*/



//conditional statment  if , switch 

var age =20;


if(age >15)
   {
       console.log("you can register");
   }     
        

/*
else{
    console.log("you canot register");
    
}

*/

/*
var name = "ali"
if( name == "ahmed"){
    console.log("no ali ");
    


}
else if(name == 'mohamed '){
    console.log( 'no mohamed' );
    
}
else if(name == 'ali'){
    console.log("yes ali");
    
}
else{
    console.log("no user");
    
} */


var cartona = "";

for(var i = 0; i < 200; i++){
  if(i % 2 == 0){
    cartona += "<h2 class='light'>ITC</h2>";
  }else{
    cartona += "<h2 class='dark'>ITC</h2>";
  }
}

document.getElementById('demo').innerHTML = cartona;






















