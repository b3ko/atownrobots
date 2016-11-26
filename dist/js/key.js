var encrypt = document.getElementById('encrypt');
			encrypt.addEventListener('click', function () {
				var mess = document.getElementById('encryptMessage');
				var em = mess.value;
				em = crypt(em, "en");
				dmess = document.getElementById('decryptMessage');
				dmess.value = em;				
			}); 
			
var decrypt = document.getElementById('decrypt');
			decrypt.addEventListener('click', function () {
				var mess = document.getElementById('decryptMessage');
				var dm = mess.value;
				dm = crypt(dm, "de");
				emess = document.getElementById('encryptMessage');
				emess.value = dm;
			}); 
			
function crypt(s, type){
	var key = document.getElementById('key');
	
	if(key.value == "")
	{
		alert("please enter a Key.");
	}
	var k = key.value;
	var klen = k.length;
	
	
	//key should be all lower case, loop through and make it so
	for (i = 0; i < klen; i++)
	{
		k = k.substr(0,i) + toCase(k[i], "lower") + k.substr(i+1);
	}
	
	var keyCount = 0; //since we will loop through the key over and over we will need to keep track of where we are.
	for(i=0; i<s.length; i++)
	{
		if(keyCount >= k.length)
		{
			keyCount = 0; //return to the beginning of the key again
		}
		
		var code = k[keyCount].charCodeAt(0) - 97; //we know the code is lower case, so subtract 97 to get the value to be between 0 and 25.
				
		if(isLetter(s[i])){ //don't encrypt non-letters
		
			//check if the letter is upper or lower
			var upper = isUpper(s[i]);
			var shift = 0;
			if(upper)
				shift = 65;
			else 
				shift = 97;
				
			var value = s.charCodeAt(i) - shift;
			
			if(type === "en"){
				s = s.substr(0,i) + String.fromCharCode(s.charCodeAt(i) + (code)) + s.substr(i+1);
			
				if(s.charCodeAt(i) - shift >= 26) {
					s = s.substr(0,i) + String.fromCharCode(s.charCodeAt(i) - 26) + s.substr(i+1);
				}	
			}
			
			if(type === "de"){
				s = s.substr(0,i) + String.fromCharCode(s.charCodeAt(i) - (code)) + s.substr(i+1);

				if(s.charCodeAt(i) - shift < 0) {
					s = s.substr(0,i) + String.fromCharCode(s.charCodeAt(i) + 26) + s.substr(i+1);
				}
			}						
				
			keyCount++;
		}
	}

	return s;
}

// check if it is letter
function isLetter(c)
{
	var ch = c.charCodeAt(0);
	if((ch >= 65 && ch <= 90)  || (ch >= 97 && ch <= 122 ))
	{
		return true;
	}
	else
	{
		return false;
	}
}

// check if it is upper or lower
function isUpper(c)
{
	var ch = c.charCodeAt(0);
	if(ch >= 65 && ch <= 90)
	{
		return true;
	}
	else 
	{
		return false;
	}
}

function toCase(c, type)
{
	if (type=="upper")
	{
		if(!isUpper(c))
		{
			return String.fromCharCode(c.charCodeAt(0) - 32);
		}
		else
		{
			return c;
		}
	}
	if (type=="lower")
	{
		if(isUpper(c))
		{
			return String.fromCharCode(c.charCodeAt(0) + 32);
		}
		else
		{
			return c;
		}
	}
	
}