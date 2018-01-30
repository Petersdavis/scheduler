
function validatePrice(value, placeholder){
		placeholder = placeholder || 0;			
			if(/[\d]/.test(value)){
				var goodvalue = "$"
				
				if(value < 0){
					goodvalue = goodvalue + "-";
				}
				goodvalue = goodvalue + /[\d]+[.]{0,1}[\d]{0,2}/.exec(value)[0];
				
				if(!/[.]/.test(goodvalue)){
					goodvalue=goodvalue + ".00"
				}
				if(!/[.][\d]{2}/.test(goodvalue)){
					goodvalue=goodvalue + "0"
					if(!/[.][\d]{2}/.test(goodvalue)){
						goodvalue=goodvalue + "0"	
						
					}
				}
				
				return goodvalue
			} else {return placeholder;}	
}


function formatDate(date_string, style){
	style = style || 1;
	var d, str;
    // "2010-10-30T00:00:00+05:30".
	d = date_string.slice(0, 10).split('-');   
    str = d[1] +'/'+ d[2] +'/'+ d[0].slice(2,4); // 10/30/2010
    return str;
}


function readURL(input) {
	if (input.files && input.files[0]) {
		
		if(input.files[0].size < 2500000){
		
		var reader = new FileReader();
		reader.onload = function (e) {
			
		}		
		reader.readAsDataURL(input.files[0]);
				
		}else{
		
		}
	}
}


export  {validatePrice, formatDate, readURL};
