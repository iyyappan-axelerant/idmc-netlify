var show, stock=[];
	
	stock['afghanistan']={name:'Afghanistan',disaster:'30,000',conflict:'117,000', url:'/countries/afghanistan/'};
	stock['australia']={name:'Australia',disaster:'51,000',conflict:'0', url:'/countries/australia/'};
stock['bangladesh']={name:'Bangladesh',disaster:'2,520,000',conflict:'210', url:'/countries/bangladesh/'};
stock['bolivia']={name:'Bolivia',disaster:'76,000',conflict:'0', url:'/countries/bolivia/'};
stock['brazil']={name:'Brazil',disaster:'163,000',conflict:'0', url:'/countries/brazil/'};
stock['burkina_faso']={name:'Burkina Faso',disaster:'3,900',conflict:'419,000', url:'/countries/burkina-faso/'};
stock['burundi']={name:'Burundi',disaster:'48,000',conflict:'75', url:'/countries/burundi/'};
stock['canada']={name:'Canada',disaster:'29,000',conflict:'0', url:'/countries/canada/'};
stock['car']={name:'Central African Republic',disaster:'2',conflict:'80,000', url:'/countries/central-african-republic/'};
stock['cameroon']={name:'Cameroon',disaster:'0',conflict:'80,000', url:'/countries/cameroon/'};
stock['chad']={name:'Chad',disaster:'2,600',conflict:'43,000', url:'/countries/chad/'};
stock['china']={name:'China',disaster:'791,000',conflict:'0', url:'/countries/china/'};
stock['colombia']={name:'Colombia',disaster:'11,000',conflict:'19,000', url:'/countries/colombia/'};
stock['drc']={name:'Dem. Rep. Congo',disaster:'349,000',conflict:'1,427,000', url:'/countries/drc'};
stock['ethiopia']={name:'Ethiopia',disaster:'301,000',conflict:'68,000', url:'/countries/ethiopia/'};
stock['guatemala']={name:'Guatemala',disaster:'26,000',conflict:'0', url:'/countries/guatemala/'};
stock['india']={name:'India',disaster:'2,670,000',conflict:'3,200', url:'/countries/india/'};
stock['indonesia']={name:'Indonesia',disaster:'508,000',conflict:'1,700', url:'/countries/indonesia/'};
stock['iran']={name:'Iran',disaster:'51,000',conflict:'0', url:'/countries/iran/'};
stock['iraq']={name:'Iraq',disaster:'38,000',conflict:'22,000', url:'/countries/iraq/'};
stock['kazakhstan']={name:'Kazakhstan',disaster:'31,000',conflict:'23,000', url:'/countries/kazakhstan/'};
stock['kenya']={name:'Kenya',disaster:'257,000',conflict:'5,300', url:'/countries/kenya/'};
stock['libya']={name:'Libya',disaster:'0',conflict:'39,000', url:'/countries/libya/'};
stock['madagascar']={name:'Madagascar',disaster:'23,000',conflict:'0', url:'/countries/madagascar/'};
stock['malawi']={name:'Malawi',disaster:'119,000',conflict:'0', url:'/countries/malawi/'};
stock['mali']={name:'Mali',disaster:'0',conflict:'113,000', url:'/countries/mali/'};
stock['mozambique']={name:'Mozambique',disaster:'3,700',conflict:'122,000', url:'/countries/mozambique/'};
stock['myanmar']={name:'Myanmar',disaster:'3,300',conflict:'37,000', url:'/countries/myanmar/'};
stock['niger']={name:'Niger',disaster:'0',conflict:'59,000', url:'/countries/niger/'};
stock['nigeria']={name:'Nigeria',disaster:'8,800',conflict:'32,000', url:'/countries/nigeria/'};
stock['pakistan']={name:'Pakistan',disaster:'20,000',conflict:'16,000', url:'/countries/pakistan/'};
stock['paraguay']={name:'Paraguay',disaster:'54,000',conflict:'0', url:'/countries/paraguay/'};
stock['philippines']={name:'Philippines',disaster:'811,000',conflict:'66,000', url:'/countries/philippines/'};
stock['somalia']={name:'Somalia',disaster:'514,000',conflict:'189,000', url:'/countries/somalia/'};
stock['south_sudan']={name:'South Sudan',disaster:'23,000',conflict:'232,000', url:'/countries/south-sudan/'};
stock['sudan']={name:'Sudan',disaster:'0',conflict:'39,000', url:'/countries/sudan/'};
stock['syria']={name:'Syria',disaster:'0',conflict:'1,474,000', url:'/countries/syria/'};
stock['tanzania']={name:'Tanzania',disaster:'57,000',conflict:'0', url:'/countries/tanzania/'};
stock['thailand']={name:'Thailand',disaster:'45,000',conflict:'0', url:'/countries/thailand/'};
stock['turkey']={name:'Turkey',disaster:'30,000',conflict:'0', url:'/countries/turkey/'};
stock['uganda']={name:'Uganda',disaster:'23,000',conflict:'3,100', url:'/countries/uganda/'};
stock['united_states']={name:'United States',disaster:'53,000',conflict:'0', url:'/countries/united-states/'};
stock['uzbekistan']={name:'Uzbekistan',disaster:'70,000',conflict:'0', url:'/countries/uzbekistan/'};
stock['vanuatu']={name:'Vanuatu',disaster:'80,000',conflict:'0', url:'/countries/vanuatu/'};
stock['yemen']={name:'Yemen',disaster:'66,000',conflict:'89,000', url:'/countries/yemen/'};
stock['zimbabwe']={name:'Zimbabwe',disaster:'52,000',conflict:'0', url:'/countries/zimbabwe/'};

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