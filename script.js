
var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				
				arr[i][j].innerText = board[i][j]
			}

			else{
				//console.log(board[i][j]);
				arr[i][j].innerText = ''
			}
				
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		//console.log(response)
		//console.log(response.board);
		board = response.board
		//console.log(board);
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}


function check(board ,i,j,num,n)
{
    for(let x = 0;x<n;x++)
    {
        if(board[i][x] == num || board[x][j] == num)
        {
            return false;
        }
    }
    let rn = Math.sqrt(n);
	console.log(`${n},${rn}`);
    let si = i - (i%rn);
    let sj = j - (j%rn);

    for(let x = si ;x<si+rn;x++)
    {
        for(let y = sj ;y<sj+rn;y++)
        {
            if(board[x][y] === num)
            {
                return false;
            }
        }
    }
    return true;
}
function SudokuSolver(board, i, j, n) {
	
    if(i == n)
    {
		console.log(board);
        FillBoard(board);
        return true;
    }
     if(j == n)
     {
        return SudokuSolver(board,i+1,0,n);
     }
     if(board[i][j] != 0)
     {
        return SudokuSolver(board,i,j+1,n);
     }
     for(let num = 1;num<=9;num++)
     {
       
		   //console.log(board);

        
            if(check(board,i,j,num,n))
            {
                board[i][j] = num;
				console.log(board);


                if(SudokuSolver(board,i,j+1,n))
                {
                    return true;
                }
               
                board[i][j] = 0;
            
            }
        
       
     }
    return false;
	
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

