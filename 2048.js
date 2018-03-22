var RN=4,CN=4;//定义总行数，总列数
var data;//定义变量data保存二维数组
var score=0;//保存得分
var status=0;
const GAMEOVER=0,RUNNING=1;//保存游戏状态

function start() 
{
	status=RUNNING;
	score=0;
	data=[];
	for(var r=0;r<RN;r++)
		{
			data.push([]);
			for(var c=0;c<CN;c++)
				{
					data[r][c]=0;
				}
		}
	randomNum();
	randomNum();
	updateView();
	document.onkeydown=function(e)
	{
		switch (e.keyCode) 
		{
			case 37:
				moveLeft();
				//debugger;
				break;
			case 38:
				moveUp();
				debugger;
				break;
			case 39:
				moveRight();
				break;
			case 40:
				moveDown();
				break;
		}
	}
}
	
function updateView() 
{
	for(var r=0;r<RN;r++)
	{
		for(var c=0;c<CN;c++)
		{
			var id="c"+r+c;
			var divObj=document.getElementById(id);
			if(data[r][c]!=0)
			{
				divObj.innerHTML=data[r][c];
				divObj.className="n"+data[r][c];
			}
			else 
			{
				divObj.innerHTML="";
				divObj.className="";
			}
		}
	}
	var spanObj=document.getElementById("score");
	spanObj.innerHTML=score;
	var divObj=document.getElementById("gameover");
	if(status==GAMEOVER)
	{
		divObj.style.display="block";
		spanObj=document.getElementById("final");
		spanObj.innerHTML=score;
	}
	else 
	{
		divObj.style.display="none";
	}
}

function randomNum() 
{
	while(true)
		{
			var r=Math.floor(Math.random()*RN);
			var c=Math.floor(Math.random()*CN);
			if(data[r][c]==0)
				{
					data[r][c]=Math.random()>0.5?2:4;
					break;
				}
		}
}

function moveRight() 
{
	var before=String(data);
	for(var r=0;r<RN;r++)
	{
		moveRightInRow(r);
	}
	var after=String(data);
	if(before!=after)
	{
		randomNum();
		if(isGAMEOVER())
		{
			status=GAMEOVER;
		}
		updateView();
	}
}

function moveRightInRow(r) 
{	
	for(var c=CN-1;c>0;c--)
	{
		var prevc=getPrevcInRow(r,c);
		if(prevc==-1) break;
		else 
		{
			if(data[r][c]==0)
			{
				data[r][c]=data[r][prevc];
				data[r][prevc]=0;
				c++;
			}
			else if(data[r][c]==data[r][prevc]) 
			{
				data[r][c]*=2;
				data[r][prevc]=0;
				score+=data[r][c];
			}
		}
	}
}

function getPrevcInRow(r,c) 
{
	for(var prevc=c-1;prevc>=0;prevc--)
	{
		if(data[r][prevc]!=0)
			return prevc;
	}
	return -1;
}
	
function moveLeft()
{
	var before=String(data);
	for(var r=0;r<RN;r++)
	{
		moveLeftInRow(r);
	}
	var after=String(data);
	if(before!=after)
	{
		randomNum();
		if(isGAMEOVER())
		{
			status=GAMEOVER;
		}
		updateView();
	}
}

function moveLeftInRow(r)
{
	for(var c=0;c<CN-1;c++)
	{
		var Nextc=getNextcInRow(r,c);
		if(Nextc==-1) break;
		else 
		{
			if(data[r][c]==0)
			{
				data[r][c]=data[r][Nextc];
				data[r][Nextc]=0;
				c--;
			}
			else if(data[r][c]==data[r][Nextc]) 
			{
				data[r][c]*=2;
				data[r][Nextc]=0;
				score+=data[r][c];
			}
		}
	}
}

function getNextcInRow(r,c)
{
	for(var Nextc=c+1;Nextc<CN;Nextc++)
	{
		if(data[r][Nextc]!=0)
			return Nextc;
	}
	return -1;
}

function moveUp() 
{
	var before=String(data);
	for(var c=0;c<CN;c++)
		{
			moveUpInCol(c);
		}
	var after=String(data);
	if(before!=after)
		{
			randomNum();
			if(isGAMEOVER())
				{
					status=GAMEOVER;
				}
			updateView();
		}
}

function moveUpInCol(c) 
{
	for(var r=0;r<RN-1;r++)
		{
			var nextr=getNextrInCol(r,c);
			if(nextr==-1) break;
			else 
			{
				if(data[r][c]==0)
					{
						data[r][c]=data[nextr][c];
						data[nextr][c]=0;
						r--;
					}
				else if(data[r][c]==data[nextr][c]) 
					{
						data[r][c]*=2;
						score+=data[r][c];
						data[nextr][c]=0;
					}
			}
		}
}

function getNextrInCol(r,c) 
{
	for(var nextr=r+1;nextr<RN;nextr++)
		{
			if(data[nextr][c]!=0)
				{
					return nextr;
				}
		}
	return -1;
}

function moveDown() 
{
	var before=String(data);
	for(var c=0;c<CN;c++)
		{
			moveDownInCol(c);
		}
	var after=String(data);
	if(before!=after)
		{
			randomNum();
			if(isGAMEOVER())
				{
					status=GAMEOVER;
				}
			updateView();
		}
}

function moveDownInCol(c) 
{
	for(var r=RN-1;r>0;r--)
		{
			var prevr=getPrevrInCol(r,c);
			if(prevr==-1) break;
			else 
			{
				if(data[r][c]==0)
				{
					data[r][c]=data[prevr][c];
					data[prevr][c]=0;
					r++;
				}
				else if (data[r][c]==data[prevr][c]) 
				{
					data[r][c]*=2;
					score+=data[r][c];
					data[prevr][c]=0;
				}
			}
		}
}

function getPrevrInCol(r,c) 
{
	for(var prevr=r-1;prevr>=0;prevr--)
		{
			if(data[prevr][c]!=0)
				{
					return prevr;
				}
		}
	return -1;
}

function isGAMEOVER() 
{
	for(var r=0;r<RN;r++)
		{
			for(var c=0;c<CN;c++)
				{
					if(data[r][c]==0) 
					{
						return false;
					}
					else if (r<RN-1&&data[r][c]==data[r+1][c]) 
					{
						return false;
					}
					else if (c<CN-1&&data[r][c]==data[r][c+1]) 
					{
						return false;
					}
				}
		}
	return true;
}

start();  