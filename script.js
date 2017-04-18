document.addEventListener('DOMContentLoaded', function(){
		grabAPIdata();   //Grab data on page load
});

setInterval(grabAPIdata, 39000); //Grab new data every 10 sec


function grabAPIdata (){
		console.log("Now grabbing api data ... ");
		var stocks = "NASDAQ:FB,NASDAQ:MSFT,NASDAQ:TSLA,NYSE:BRK.A,TSX:CNQ,NYSE:BABA,TSX:RY,TSX:CM,TSX:TD"

		var queryString = "https://finance.google.com/finance/info?client=ig&q=" + stocks;
	
		$.ajax({
			url: queryString,
			dataType: "jsonp",
			jsonpCallback: "jsonCallback"
		});	
}


function jsonCallback(json){
	var jsondata = json;
	console.log(json);
	sortData(jsondata);
}

function sortData(jsondata){
	for (var object in jsondata){
		var object = jsondata[object];
//		console.log(object.t);
	}
	
	var tickers = jsondata.map(function (object){
		return [object.t];
	});
	var price = jsondata.map(function (object){
		return object.l; 
	});
	var change = jsondata.map(function (object){
		return object.c; 
	});
	
	var tickerdata = jsondata.map(function (object){
		return [object.t,object.l,object.c];
	});
	
//	console.log("var tickerdata = ");
//	console.log(tickerdata);
	
	injectData(tickerdata);
}

function injectData(data){
	var ticker1text = document.querySelector("p.text");
	var ticker2text = document.querySelector("p.text2");
	var ticker1String = "";
	var ticker2String = "";
	var uparrow = String.fromCharCode(9650);
	var downarrow = String.fromCharCode(9660);
			console.log(uparrow + downarrow);
	for (var ticker of data){
		ticker1String += ticker[0] + " : $" + ticker[1] + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0 ";
		if (ticker[2] < 0){ //if change is negative
			ticker2String += "<span style=\"color:red;\">" + ticker[0] + "\xa0" + downarrow +""+ ticker[2] + "</span> \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
		}
		else{
			ticker2String += "<span style=\"color:green;\">"+ ticker[0] + "\xa0" + uparrow + ticker[2]+ " </span> \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
		}
	}
//  	console.log(ticker2text);
	ticker1text.innerHTML = ticker1String;
	ticker2text.innerHTML = ticker2String;
//		console.log(ticker1text.innerHTML);
//		console.log(ticker2text.innerHTML);
	
	updateTimeStamp();
}

function updateTimeStamp(){
	 var a = new Date();
//					console.log(a);
//			console.log(b);
	var c = new Date().toLocaleString();
	console.log(c);
	 
   // Change text in the DOM with new date
	document.querySelector("#timestamp p").innerHTML= "Last Updated<br>" + c;
};



/*var stocks = 
		"NASDAQ:FB,NASDAQ:MSFT,NASDAQ:TSLA,HKG:0700,NYSE:BRK.A,TSX:CNQ,NYSE:BABA";
var queryString = "https://finance.google.com/finance/info?client=ig&q=" + stocks;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open("GET",queryString,false);
xhr.send();
console.log(xhr.status);
console.log(xhr.statusText);*/


/*var stocks =	"FB"; MSFT,TSLA,BRK.A,BABA
var domain = "http://www.alphavantage.co/query?";
var datafunction = "function=" + "TIME_SERIES_INTRADAY";
var interval = "&interval=" + "1min";
var api = "&apikey=" + "YVDT";

var queryString = domain + datafunction + "&symbol=" + stocks + interval + api;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open("GET",queryString,false);
xhr.send();
console.log(xhr.status);
console.log(xhr.statusText);*/


