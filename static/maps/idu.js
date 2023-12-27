var show, stock=[];
	
	stock['niger']={name:'Niger',disaster:'40,000',conflict:'52,000', url:'/countries/niger/'};
stock['cameroon']={name:'Cameroon',disaster:'0',conflict:'459,000', url:'/countries/cameroon/'};
stock['libya']={name:'Libya',disaster:'0',conflict:'70,000', url:'/countries/libya/'};
stock['sudan']={name:'Sudan',disaster:'121,000',conflict:'41,000', url:'/countries/sudan/'};
stock['south_sudan']={name:'South Sudan',disaster:'6,600',conflict:'321,000', url:'/countries/south-sudan/'};
stock['uganda']={name:'Uganda',disaster:'164,000',conflict:'9,000', url:'/countries/uganda/'};
stock['ethiopia']={name:'Ethiopia',disaster:'296,000',conflict:'2,895,000', url:'/countries/ethiopia/'};
stock['somalia']={name:'Somalia',disaster:'547,000',conflict:'57,000', url:'/countries/somalia/'};
stock['kenya']={name:'Kenya',disaster:'336,000',conflict:'10,000', url:'/countries/kenya/'};
stock['rwanda']={name:'Rwanda',disaster:'47,000',conflict:'0', url:'/countries/rwanda/'};
stock['tanzania']={name:'Tanzania',disaster:'29,000',conflict:'0', url:'/countries/tanzania/'};
stock['madagascar']={name:'Madagascar',disaster:'75,000',conflict:'1,700', url:'/countries/madagascar/'};
stock['mozambique']={name:'Mozambique',disaster:'31,000',conflict:'3,800', url:'/countries/mozambique/'};
stock['burundi']={name:'Burundi',disaster:'35,000',conflict:'5,100', url:'/countries/burundi/'};
stock['drc']={name:'Dem. Rep. Congo',disaster:'81,000',conflict:'1,840,000', url:'/countries/democratic-republic-of-the-congo/'};
stock['car']={name:'Central African Republic',disaster:'9,300',conflict:'510,000', url:'/countries/central-african-republic/'};
stock['nigeria']={name:'Nigeria',disaster:'613,000',conflict:'541,000', url:'/countries/nigeria/'};
stock['benin']={name:'Benin',disaster:'23,000',conflict:'3,500', url:'/countries/benin/'};
stock['ghana']={name:'Ghana',disaster:'61,000',conflict:'5,000', url:'/countries/ghana/'};
stock['burkina_faso']={name:'Burkina Faso',disaster:'5,100',conflict:'42,000', url:'/countries/burkina-faso/'};
stock['mali']={name:'Mali',disaster:'19,000',conflict:'126,000', url:'/countries/mali/'};


	function showstocktooltip(thisId,pos,tooltipId, el) {

			var tooltip = document.getElementById(tooltipId);
			tooltip.querySelector(".name").innerHTML = stock[thisId].name;
			tooltip.querySelector(".disaster").innerHTML = (stock[thisId].disaster=="0") ? "":stock[thisId].disaster;
			tooltip.querySelector(".conflict").innerHTML = (stock[thisId].conflict=="0") ? "":stock[thisId].conflict;
			if ( stock[thisId].disaster != "0" &&  stock[thisId].conflict != "0") {
				tooltip.querySelector(".colon").innerHTML = " | "
			} else {
				tooltip.querySelector(".colon").innerHTML = "";
			}
			tooltip.style.left = pos[0]+"px";
			tooltip.style.top = pos[1]+"px";
			tooltip.classList.add("showIt");	

		
	}
	
	function hidetooltip(tooltipId) {
		var tooltip = document.getElementById(tooltipId);
		tooltip.querySelector(".name").innerHTML = "";
		tooltip.style.left = "-500px";
			tooltip.style.top = "-500px";
		tooltip.classList.remove("showIt");
	}

	function openStockWindow(el) {
		console.log("url",stock[el].url);
		if (stock[el].url != "") {
			window.open('http://internal-displacement.org'+stock[el].url, "_blank");
		}

	}