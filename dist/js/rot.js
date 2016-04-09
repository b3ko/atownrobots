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
	var rot = document.getElementById('rot');
	var r = parseInt(rot.value);

	if(!r){
		r = 13;
	}
	
	if(type == "d")
	{
		r = 26 - r;
	}
	var s2 = s;
	for(i=0; i<s.length; i++)
	{
		if(isLetter(s2[i]))
		{
			if(isUpper(s2[i]))
			{
				s2 = s2.substr(0,i) + String.fromCharCode(s2.charCodeAt(i) + r) + s2.substr(i+1)
				if(!isUpper(s2[i]))
				{
					s2 = s2.substr(0,i) + String.fromCharCode(s2.charCodeAt(i) - 26) + s2.substr(i+1)
				}
			}
			else
			{
				s2 = s2.substr(0,i) + String.fromCharCode(s2.charCodeAt(i) + r) + s2.substr(i+1)
				if(!isLetter(s2[i]))
				{
					s2 = s2.substr(0,i) + String.fromCharCode(s2.charCodeAt(i) - 26) + s2.substr(i+1)
				}
			}
		}
	}

	return s2;
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
