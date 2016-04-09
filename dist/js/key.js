var encrypt = document.getElementById('encrypt');
			encrypt.addEventListener('click', function () {
				var mess = document.getElementById('encryptMessage');
				var em = mess.value;
				em = crypt(em, "e");
				dmess = document.getElementById('decryptMessage');
				dmess.value = em;				
			}); 
			
var decrypt = document.getElementById('decrypt');
			decrypt.addEventListener('click', function () {
				var mess = document.getElementById('decryptMessage');
				var dm = mess.value;
				dm = crypt(dm, "d");
				emess = document.getElementById('encryptMessage');
				emess.value = dm;
			}); 
			
function crypt(s, type){
	var key = document.getElementById('key');
	var k = key.value;
	var klen = k.length;
	
	//key should be all lower case, loop through and make it so
	for (i = 0; i < klen; i++)
	{
		k = k.substr(0,i) + toCase(k[i], "lower") + k.substr(i+1);
	}
	
	var x = 1;
	if (type=="d")
	{
		x = -1;
	}
	
	var keyCount = 0; //since we will loop through the key over and over we will need to keep track of where we are.
	for(i=0; i<s.length; i++)
	{
		if(keyCount >= k.length)
		{
			keyCount = 0; //return to the beginning of the key again
		}
		
		if(isLetter(s[i])) //only encode alpha chars, not spaces, special characters, punctuation, etc.
		{
			if(isUpper(s[i]))
			{
				s = s.substr(0,i) + String.fromCharCode(s.charCodeAt(i) + (k[keyCount].charCodeAt(0) - 96) * x) + s.substr(i+1)
				if(!isUpper(s[i])) //we have transformed it into something that is no longer an upper case letter
				{
					s = s.substr(0,i) + String.fromCharCode(s.charCodeAt(i) - 26) + s.substr(i+1) //cast it back
				}
			}
			else //lower
			{
				s = s.substr(0,i) + String.fromCharCode(s.charCodeAt(i) + (k[keyCount].charCodeAt(0) - 96) * x) + s.substr(i+1)
				if(!isLetter(s[i])) //we have transformed it into something that is no longer a lower case letter
				{
					s = s.substr(0,i) + String.fromCharCode(s.charCodeAt(i) - 26) + s.substr(i+1) //cast it back
				}
			}
		keyCount++;
		}
		
	}

	return s;
}

//check if it is letter
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

//check if it is upper or lower
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