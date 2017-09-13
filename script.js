document.addEventListener('DOMContentLoaded', function(){
		grabAPIdata();   //Grab data on page load
});

setInterval(grabAPIdata, 39000); //Grab new data every 10 sec


function grabAPIdata (){
		console.log("Now grabbing api data ... ");
		var stocks = "FB,MSFT,TSLA,BRK-A,CNQ,BABA,RY,CM,TD"

		var queryString = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20csv%20where%20url%3D%27http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes.csv%3Fs%3D"+ stocks +"%26f%3Dsl1d1t1c1ohgv%26e%3D.csv%27%20and%20columns%3D%27symbol%2Cprice%2Cdate%2Ctime%2Cchange%2Ccol1%2Chigh%2Clow%2Ccol2%27&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

		$.ajax({
			url: queryString,
			dataType: "jsonp",
			jsonpCallback: "jsonCallback"
		});
}


function jsonCallback(json){
	var jsondata = json.query.results.row;
	console.log(jsondata);
	sortData(jsondata);
}

function sortData(jsondata){
	for (var object in jsondata){
		var object = jsondata[object];
		console.log(object);
	}

	var tickers = jsondata.map(function (object){
		return object.symbol;
	});
	var price = jsondata.map(function (object){
		return object.price;
	});
	var change = jsondata.map(function (object){
		return object.change;
	});

	var tickerdata = jsondata.map(function (object){
		return [object.symbol,object.price,object.change];
	});

//	console.log("var tickerdata = ");
	console.log(tickerdata);

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
