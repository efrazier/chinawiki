const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const https = require('https');

var getURL = 'https://en.wikipedia.org/wiki/List_of_Chinese_monarchs';

https.get(getURL, (resp) => {

  let data = '';
  
  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    var {document}   =  new JSDOM(data, {url: getURL,contentType: "text/html; charset=UTF-8",} ).window ;

      getIDsFromULs(document);

    /*
    var tables = document.getElementsByTagName("table");
    console.log("one table", tables[4].rows.length )
    
    for (var i=0; i<tables.length; i++){
       console.log("one table", tables[i].rows.length )
       showTableData( tables[i].rows  );
    }
    */

  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

function getIDsFromULs(document){


var idList = {};
idList.href = []; 
idList.text = [];
idList.href_decoded = [];

 // Start with UL lists and find anchors from those which will point to table locations
    var list = document.getElementsByTagName("UL")
    console.log("LISTS ", list );
    for (var x=0; x<list.length; x++){   // loop UL list(s)
      var ULchildren = list[x].children; // get child elements under the <UL>
      for (var i=0; i< ULchildren.length; i++){  //loop through children and look for <a href
          var anchor = ULchildren[i].querySelector("a");
          if (anchor){   // if a exists, then get text for link and href, only IF that href exists in the DOM.
            var hrefID = '';
            if (anchor.href.match(/#/)){
              hrefID = anchor.href.split('#')[1];
              hrefID = decodeURI(hrefID);
            }
            if (document.getElementById(hrefID)){   // if it exists print it, otherwise ignore as it is external link.
               console.log("Item ",anchor.text );
               console.log("href ",anchor.href );
               idList.href.push(anchor.href)
               idList.text.push(anchor.text);
               idList.href_decoded.push(hrefID);
            }
          }else{
            //another ul?
            console.log("WTF IS IT?");
            console.log( ULchildren[i].nodeName );
          }
      }
    }
console.log("ID LIST Complete");
console.log(idList);

//getTableHeading(idList,document);
findTableDown(idList,document);

}

function getTableHeading(idList,document){

	for (var i=0;i<idList.href_decoded.length;i++){
           console.log("get heading -", idList.href_decoded[i] );
           var heading = document.getElementById(idList.href_decoded[i]).nextElementSibling;
           var table = document.getElementById(idList.href_decoded[i]).nextSibling;
           console.log("Heading ",heading.querySelector("a").href, table );
        }

}

function findTableDown(idList,document){

  idList.tableelement = [];

  for (var i=0;i<idList.href_decoded.length;i++){
       console.log("---get table", idList.href_decoded[i] );
       currentID = document.getElementById(idList.href_decoded[i]);
    var node;
    var result = [],
    node = currentID.parentNode;

     while ( node ) {
       if ( node !== currentID && node.nodeType === node.ELEMENT_NODE ) 
       result.push( node );
          if (node.tagName == 'TABLE') { 
             idList.tableelement.push( node.rows );
             console.log("-----------table ", node.tagName,node.nodeType,node.getAttributeNode("class").nodeValue );
             console.log(node.rows);
             console.log("END");             
            t=node;
            if(t) {                                                                                                   
              Array.from(t.rows).forEach((tr, row_ind) => {                                                         
                  Array.from(tr.cells).forEach((cell, col_ind) => {                                                 
                      console.log('Value at row/col [' + row_ind + ',' + col_ind + '] = ' + cell.textContent);      
                      console.log('COLSPAN ',cell.colSpan);
                  });                                                                                               
              });                                                                                                   
            }                                                                                                         

             break;
          }
       node = node.nextElementSibling || node.nextSibling;
    }

//console.log("nodes ", result);

  }
console.log(idList);

}


function showTableData(tablerows) {

        for (var i = 1; i < tablerows.length; i++) {
           
             var listOfRowContents = tablerows[i].cells;
             console.log("---- ", listOfRowContents );

             for (var j = 0; j < listOfRowContents.length; j++){
                console.log("----------", listOfRowContents[j].cellIndex, "ColSpan ",listOfRowContents[j].colSpan );
                console.log("CELL -- ", listOfRowContents[j].innerHTML);
             }             

        }
    }
