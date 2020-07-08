# honest_food
It is essential to be able to route incoming orders to the correct outlet depending on predefined delivery area polygons and the customer’s shipping address.

client : client contains frontend application built on angular8.
navidate to client folder then 
if angular is not installed run npm install -g @angular/cli
npm install
ng serve

server : server contains backend code built on nodejs and express.
navigate to server folder then 
npm install
node server.js


Test cases:
Input: “Stumpergasse 51, 1060 Vienna” 		Output: au_vienna_schoenbrunnerstr
Input: “Ungargasse 17, Vienna, Austria” 		Output: au_vienna_landstrasserhauptstr
Input: “Linzer Straße 7, Vienna, Austria” 		Output: au_vienna_dreyhausenstr
Input: “Maurer Hauptplatz 7, 1230 Wien, Austria” 	Output: au_vienna_maurerhauptplatz
Input: “Bahnhofplatz 1, Linz, Austria”			Output: not found
Input: “Quadenstraße 5, 1200 Vienna”		Output: not found

