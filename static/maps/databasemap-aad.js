
    //document.getElementById('select').appendChild(document.getElementsByClassName("div-select-country-on-map")[0]);
    var intervalLastGridStock = setInterval(function (){
        if (document.readyState === 'complete') {
            clearInterval(intervalLastGridStock);

            var removeLinkCountries = ['GRL', 'ESH', 'ISL', 'SJM', 'BEL', 'NLD', 'DNK', 'BLR', 'LTU', 'LVA', 'EST', 'GNQ', 'DJI', 'SWZ', 'KWT', 'QAT', 'ARE', 'GUY', 'GUF', 'FLK', 'PRI', 'NCL', 'ATF', 'SVK'];

            var removeLinkContriesConfigs = removeLinkCountries.map(function(item){
                return {
                    "id": item,
                    "selectable": false,
                    "color" : "#A5A9A9",
                    "colorSolid" : "#A5A9A9",
                    "selectedColor" : "#A5A9A9",
                    "outlineColor" : "#A5A9A9",
                    "rollOverOutlineColor" : "#A5A9A9",
                }
            });
        
            var map = AmCharts.makeChart("mapdiv_id",{
                type: "map",
                //projection: "mercator",
                projection: "equirectangular",
                panEventsEnabled : true,
                // backgroundColor : "#F9F9F9",
                backgroundColor : "#333132",
                backgroundAlpha : 1,
                zoomControl: {
                zoomControlEnabled : true
                },
                dataProvider : {
                    mapURL: "/maps/idmcmap/worldLow.svg",
                    getAreasFromMap : true,
                    "areas": removeLinkContriesConfigs
                },
                areasSettings : {
                    autoZoom : false,
                    selectable: true,
                    color : "#D8D8D8",
                    colorSolid : "#D8D8D8",
                    selectedColor : "#D8D8D8",
                    outlineColor : "#A5A9A9",
                    rollOverColor : "#A5A9A9",
                    rollOverOutlineColor : "#F9F9F9"
                },
                responsive: {
                    "enabled": true
                }
            });
           
            // click to an area then redirect to it's link
            map.addListener("clickMapObject", function(event) {
                // remove links from some countries
                // List removed countries IDs: GRL, ESH, ISL, SJM, BEL, NLD, DNK, BLR, LTU, LVA, EST, GNQ, DJI, SWZ, KWT, QAT, ARE, GUY, GUF, FLK, PRI, NCL, ATF, SVK
                if (removeLinkCountries.indexOf(event.mapObject.id) != -1) {
                    return;
                }
                document.getElementById('aadspecific').innerHTML = "";
                jQuery('#select2country').val(null).trigger('change');
              function reqListener () {
                  var prospective = JSON.parse(this.responseText);
                  var thisCountry = [];
                  for(var i = 0; i < prospective.length; i++) {
                      var obj = prospective[i];
                      if (obj.iso3 === event.mapObject.id && obj.analysis_type === "Prospective") {
                        obj.country = event.mapObject.enTitle;
                        thisCountry.push(obj)
                      } 
                  }
                
                  outputThisCountry(thisCountry)
                }
              
              
                var oReq = new XMLHttpRequest();
                oReq.addEventListener("load", reqListener);
                oReq.open("GET", "/maps/idmcscript/prospective_displacement.json");
                oReq.send();
                //console.log("click country", event.mapObject);
            });
          

            
            
            
          }
    }, 500);
  var specificCounter, count;
  var options = {
              useEasing: true, 
              useGrouping: true, 
              separator: ',', 
              decimal: '.', 
            };
  
  function outputThisCountry (thisCountry) {
            if (thisCountry.length === 0) return;
            document.getElementById('aadtitle').innerHTML = thisCountry[0].country;
            var result = [];
            count = 0;
            specificCounter=0;
            for(var i = 0; i < thisCountry.length; i++) {
              count += Math.floor(thisCountry[i].aad);
            }
            
            document.getElementById('aadtitle').innerHTML += " <span id='aadtotal' style='font-weight: bold'>"+count+"<\/span>: Average expected number of displacements per year – for all hazards";
            
            var total = new CountUp("aadtotal", 0, count, 0, 2, options);
            if (!total.error) {
              total.start();
              spec(thisCountry);
            } else {
              console.log(total.error);
            }
  }
            
    function spec(thisCountry) {

      if (specificCounter >= thisCountry.length) {
        specificCounter = 0;
        spec2(thisCountry);
        return;}
      if (Math.floor(thisCountry[specificCounter].aad) > 0) {
        var haz = (thisCountry[specificCounter].hazard).toLowerCase();
        var imgSrc = "/maps/icons/aad_"+haz+".png";
        var hazName;
        if (haz === 'storm') {
          hazName = 'Storm surge';
        } else if (haz === 'wind') {
          hazName = 'Cyclonic wind';
        } else {
          hazName = thisCountry[specificCounter].hazard;
        }
        document.getElementById('aadspecific').innerHTML += "<div class='col-xs-2 col-md-2 float-left text-center'><img src='"+imgSrc +"' alt='"+haz+"'><br> <span id='aad"+specificCounter+"' class='lead'>"+Math.floor(thisCountry[specificCounter].aad)+"<\/span> <br>"+hazName+"<\/div>";
        specificCounter ++;
        spec(thisCountry);
      } else {
        specificCounter ++;
        spec(thisCountry);
      }


    }

    function spec2(thisCountry) {   
      if (specificCounter >= thisCountry.length) return;
      if (Math.floor(thisCountry[specificCounter].aad) > 0) {
        var aadSpec = new CountUp("aad"+specificCounter, 0, Math.floor(thisCountry[specificCounter].aad), 0, 2, options);
        specificCounter ++;
        aadSpec.start();
        spec2(thisCountry);
      } else {
        specificCounter ++;
        spec2(thisCountry);
      }


    }
            
   
    
//   document.getElementById("select2country").onchange = function(e) {
//               //console.log(this[this.selectedIndex].value)
//               //window.location.href = this[this.selectedIndex].value
//               document.getElementById('aadspecific').innerHTML = "";
//               var val =this[this.selectedIndex].value;
//               var txt =this[this.selectedIndex].text;
//      function select2Listener() {
//                   var prospective = JSON.parse(this.responseText);
//        //console.log(prospective, val, txt);
//                   var thisCountry = [];
//                   for(var i = 0; i < prospective.length; i++) {
//                       var obj = prospective[i];
//                       if (obj.iso3 === val && obj.analysis_type === "Prospective") {
//                         obj.country = txt;
//                         thisCountry.push(obj);
//                       } 
//                   }
//                   outputThisCountry(thisCountry);
//                 }
    
    
//               var req = new XMLHttpRequest();
//               req.addEventListener("load", select2Listener);
//               req.open("GET", "/" + "{{ modulepath }}" + "/js/idmcscript/prospective_displacement.json");
//               req.send();
// 	       }

